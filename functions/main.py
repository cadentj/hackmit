import datetime
import random
import time
from typing import Any, Optional, List
import json

from firebase_functions import https_fn, db_fn, options
from firebase_admin import initialize_app
from firebase_admin import db
from firebase_admin.db import Reference
from langchain.callbacks import StreamingStdOutCallbackHandler
from firebase_admin import credentials
from prompts.final import Janus
import traceback

DB_URL = "https://janus-4326f-default-rtdb.firebaseio.com"
cred = credentials.Certificate("./janus-4326f-62cc9d861e34.json")
initialize_app(cred, {'databaseURL': DB_URL})
import sys
from pathlib import Path

sys.path.insert(0, Path(__file__).parent.as_posix())


class DBStreamingCallbackHandler(StreamingStdOutCallbackHandler):
    partial_out = ""

    def __init__(
            self,
            *,
            msg_ref: Reference = None
    ) -> None:
        """Instantiate DBStreamingCallbackHandler.
        """
        super().__init__()
        self.msg_ref = msg_ref

    def append_to_last_tokens(self, token: str) -> None:
        self.last_tokens.append(token)
        self.last_tokens_stripped.append(token.strip().replace(" ", ""))
        if len(self.last_tokens) > len(self.answer_prefix_tokens):
            self.last_tokens.pop(0)
            self.last_tokens_stripped.pop(0)

    def check_if_answer_reached(self) -> bool:
        if self.strip_tokens:
            prefix_str = "".join(self.answer_prefix_tokens_stripped)
            last_str = "".join(self.last_tokens_stripped)
            if not self.answer_reached and prefix_str in last_str:
                start_idx = last_str.index(prefix_str)
                self.partial_out = "".join(self.last_tokens_stripped)[start_idx + len(prefix_str):] + " "
                return True
            return self.last_tokens_stripped == self.answer_prefix_tokens_stripped
        else:
            return self.last_tokens == self.answer_prefix_tokens

    def on_llm_new_token(self, token: str, **kwargs: Any) -> None:
        """Run on new LLM token. Only available when streaming is enabled."""

        # Remember the last n tokens, where n = len(answer_prefix_tokens)
        self.append_to_last_tokens(token)

        # Check if the last n tokens match the answer_prefix_tokens list ...
        if self.check_if_answer_reached():
            self.answer_reached = True
            if self.stream_prefix:
                for t in self.last_tokens:
                    self.partial_out += t
                    self.msg_ref.update({"response": self.partial_out.strip()})
            return

        # ... if yes, then print tokens from now on
        if self.answer_reached:
            # end answer
            if '"' in token.strip():
                self.answer_reached = False
                token = token.strip('" ')

            self.partial_out += token
            self.msg_ref.update({"response": self.partial_out.strip()})


def convert_msgs_to_chat_string(msgs) -> str:
    chat = ""
    for m in msgs:
        chat += f"{m['from']}: {m['text']}\n"

    if len(chat) > 1:
        chat = chat[:-1]

    return chat


DEFAULT_STATUS = "I'm not sure yet how you're doing here."


def collect_statements(statements: List[str]):
    return [{"statement": state, "status": DEFAULT_STATUS, "score": None} for state in statements]


@https_fn.on_call(region=options.SupportedRegion.US_CENTRAL1,
                  memory=options.MemoryOption.GB_4,
                  cors=options.CorsOptions(cors_origins="*", cors_methods="*"))
def set_gva(req: https_fn.CallableRequest):
    """Set user's goals, visions and attributes."""
    uid = req.auth.uid

    if uid is None:
        return

    print(req.data)
    goal_list = collect_statements(req.data["goals"])
    vision_list = collect_statements(req.data["visions"])
    att_list = collect_statements(req.data["attributes"])

    db.reference(f"metrics/{uid}").set({"goals": goal_list,
                                        "visions": vision_list,
                                        "attributes": att_list})

    db.reference(f"week/{uid}").set({"summary": "Please write more entries so I can learn more about your week."})
    db.reference(f"month/{uid}").set({"summary": "Please write more entries so I can learn more about your month."})

    return True


def extract_statements(statement_list):
    return [it["statement"] for it in statement_list]


cat_names = ["goals", "visions", "attributes"]
@https_fn.on_request(
    cors=options.CorsOptions(cors_origins="*", cors_methods=["get", "post"])
)
def day_entry(req: https_fn.Request):
    """Create a journal entry for a given day."""

    print("day entry")
    uid = req.args["uid"]
    today = datetime.datetime.strftime("%Y-%m-%d")

    # entries = db.reference(f"days/{uid}").get()
    # entry_list = [ent["entry"] for ent in entries.values()]

    metrics_ref = db.reference(f"metrics/{uid}/")
    user_metrics = metrics_ref.get()
    goal_list = extract_statements(user_metrics["goals"])
    vision_list = extract_statements(user_metrics["visions"])
    att_list = extract_statements(user_metrics["attributes"])

    jns = Janus(vision_list, goal_list, att_list)

    evaluation = jns.evaluate(req.args["entry"])

    for cat_str, cat_idx in enumerate(list(user_metrics.keys())):
        for i in user_metrics[cat_str].keys():
            user_metrics[cat_str][i]["score"] = evaluation[str(cat_idx + 1)][int(i - 1)]
            user_metrics[cat_str][i]["status"] = evaluation["4"][cat_str][int(i - 1)]

    metrics_ref.set(user_metrics)

    print(user_metrics)
    return https_fn.Response(json.dumps(user_metrics))
