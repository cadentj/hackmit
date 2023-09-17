import datetime
import time
from typing import Any, Optional, List

from firebase_functions import https_fn, db_fn, options
from firebase_admin import initialize_app
from firebase_admin import db
from firebase_admin.db import Reference
# from langchain.callbacks import FinalStreamingStdOutCallbackHandler
from firebase_admin import credentials
import traceback

DB_URL = "https://console.firebase.google.com/u/1/project/janus-4326f/database/janus-4326f-default-rtdb/data/~2F"
initialize_app({'databaseURL': DB_URL})
import sys
from pathlib import Path

sys.path.insert(0, Path(__file__).parent.as_posix())


# class FinalDBStreamingCallbackHandler(FinalStreamingStdOutCallbackHandler):
#     partial_out = ""
#
#     def __init__(
#             self,
#             *,
#             answer_prefix_tokens: Optional[List[str]] = None,
#             strip_tokens: bool = True,
#             stream_prefix: bool = False,
#             msg_ref: Reference = None
#     ) -> None:
#         """Instantiate FinalDBStreamingCallbackHandler.
#
#         Args:
#             answer_prefix_tokens: Token sequence that prefixes the anwer.
#                 Default is ["Final", "Answer", ":"]
#             strip_tokens: Ignore white spaces and new lines when comparing
#                 answer_prefix_tokens to last tokens? (to determine if answer has been
#                 reached)
#             stream_prefix: Should answer prefix itself also be streamed?
#             msg_ref: Firebase DB ref for message to update
#         """
#         super().__init__(stream_prefix=stream_prefix,
#                          strip_tokens=strip_tokens,
#                          answer_prefix_tokens=answer_prefix_tokens)
#         self.msg_ref = msg_ref
#
#     def append_to_last_tokens(self, token: str) -> None:
#         self.last_tokens.append(token)
#         self.last_tokens_stripped.append(token.strip().replace(" ", ""))
#         if len(self.last_tokens) > len(self.answer_prefix_tokens):
#             self.last_tokens.pop(0)
#             self.last_tokens_stripped.pop(0)
#
#     def check_if_answer_reached(self) -> bool:
#         if self.strip_tokens:
#             prefix_str = "".join(self.answer_prefix_tokens_stripped)
#             last_str = "".join(self.last_tokens_stripped)
#             if not self.answer_reached and prefix_str in last_str:
#                 start_idx = last_str.index(prefix_str)
#                 self.partial_out = "".join(self.last_tokens_stripped)[start_idx + len(prefix_str):] + " "
#                 return True
#             return self.last_tokens_stripped == self.answer_prefix_tokens_stripped
#         else:
#             return self.last_tokens == self.answer_prefix_tokens
#
#     def on_llm_new_token(self, token: str, **kwargs: Any) -> None:
#         """Run on new LLM token. Only available when streaming is enabled."""
#
#         # Remember the last n tokens, where n = len(answer_prefix_tokens)
#         self.append_to_last_tokens(token)
#
#         # Check if the last n tokens match the answer_prefix_tokens list ...
#         if self.check_if_answer_reached():
#             self.answer_reached = True
#             if self.stream_prefix:
#                 for t in self.last_tokens:
#                     self.partial_out += t
#                     self.msg_ref.update({"response": self.partial_out.strip()})
#             return
#
#         # ... if yes, then print tokens from now on
#         if self.answer_reached:
#             # end answer
#             if '"' in token.strip():
#                 self.answer_reached = False
#                 token = token.strip('" ')
#
#             self.partial_out += token
#             self.msg_ref.update({"response": self.partial_out.strip()})


def convert_msgs_to_chat_string(msgs) -> str:
    chat = ""
    for m in msgs:
        chat += f"{m['from']}: {m['text']}\n"

    if len(chat) > 1:
        chat = chat[:-1]

    return chat


@https_fn.on_call(region=options.SupportedRegion.US_CENTRAL1, memory=options.MemoryOption.GB_4)
def set_gva(req: https_fn.CallableRequest):
    """Set user's goals, visions and attributes."""
    uid = req.auth.uid
    goal_state = req.data.goals
    vision_state = req.data.vision
    att_state = req.data.attributes

    db.reference(f"metrics/{uid}").set({"goals": {"statement": goal_state},
                                        "vision": {"statement": vision_state},
                                        "attributes": {"statement": att_state}})


@https_fn.on_call(region=options.SupportedRegion.US_CENTRAL1, memory=options.MemoryOption.GB_4)
def day_entry(req: https_fn.CallableRequest):
    """Create a journal entry for a given day."""
    uid = req.auth.uid

    if uid is None:
        return

    today = datetime.datetime.strftime("%Y-%m-%d")
    ref = db.reference(f"days/{uid}/{today}")
    day_ref = ref.set(({"entry": None,
                        "response": None,
                        "goal_rating": None,
                        "vision_rating": None,
                        "att_rating": None}))

    metrics_ref = db.reference(f"metrics/{uid}/")
    user_metrics = metrics_ref.get()

    # TODO: generate response

    return response
