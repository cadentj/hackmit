
import datetime
import json
from flask import Flask, request, jsonify, send_from_directory
import json
from waitress import serve
from flask_cors import CORS, cross_origin
from firebase_functions import https_fn, db_fn, options
import json
from firebase_admin import db, initialize_app
from firebase_admin import credentials
from prompts.final import Janus
DB_URL = "https://janus-4326f-default-rtdb.firebaseio.com"
cred = credentials.Certificate("./functions/janus-4326f-62cc9d861e34.json")
initialize_app(cred, {'databaseURL': DB_URL})
import logging
import sys
app = Flask(__name__)
CORS(app, supports_credentials=True)
# app.config['CORS_HEADERS'] = 'Content-Type'


def extract_statements(statement_list):
    return [it["statement"] for it in statement_list]


cat_names = ["goals", "visions", "attributes"]

@app.route('/day-entry/', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def day_entry():
    """Create a journal entry for a given day."""

    print("day entry")

    uid = request.json['data']["uid"]
    date = request.json['data']["date"]

    # entries = db.reference(f"days/{uid}").get()
    # entry_list = [ent["entry"] for ent in entries.values()]

    metrics_ref = db.reference(f"metrics/{uid}/")
    user_metrics = metrics_ref.get()
    goal_list = extract_statements(user_metrics["goals"])
    vision_list = extract_statements(user_metrics["visions"])
    att_list = extract_statements(user_metrics["attributes"])

    jns = Janus(vision_list, goal_list, att_list)

    evaluation = jns.evaluate(request.json['data']["entry"])

    avgs = []
    print("user metrics", json.dumps(user_metrics, indent=2))
    for cat_idx, cat_str in enumerate(list(user_metrics.keys())):
        # run_avg = 0
        count = 0
        for i in range(len(user_metrics[cat_str])):

            if type(evaluation[str(cat_idx + 1)]) == type(list):
                pass
            elif type(evaluation[str(cat_idx + 1)]) == type(str):
                if '[' in evaluation[str(cat_idx + 1)]:
                    evaluation[str(cat_idx + 1)] = eval(evaluation[str(cat_idx + 1)])
                else:
                    evaluation[str(cat_idx + 1)] = [int(x) for x in evaluation[str(cat_idx + 1)].split(',')]

            print("evaluation[str(cat_idx + 1)]", evaluation[str(cat_idx + 1)])

            if type(evaluation['4']) == type(str): 
                evaluation['4'] = json.loads(evaluation['4'])

            user_metrics[cat_str][i]["score"] = evaluation[str(cat_idx + 1)][i]
            # run_avg += int(user_metrics[cat_str][i]["score"])
            # count += 1
            user_metrics[cat_str][i]["status"] = evaluation["4"][cat_str][i]
        # avgs.append(int(run_avg / count))
    print('user_metrics')
    print(json.dumps(user_metrics,indent=2))
    metrics_ref.set(user_metrics)

    ref = db.reference(f"days/{uid}/{date}")
    ref.set(({"entry": request.json['data']["entry"],
              **user_metrics
              }))
    return jsonify(user_metrics)


@app.route('/read-metrics/<uid>', methods=['GET'])
# @cross_origin(supports_credentials=True)
def read_metrics(uid):
    # uid = request.json["uid"]
    # uid = int(
    print(f'{uid=}')
    ret = db.reference(f"metrics/{uid}").get()
    print("ret", ret)
    return jsonify(ret)


@app.route('/all-data/', methods=['GET', 'POST'])
def read_all_data():
    uid = request.json['data']["uid"]
    return jsonify(db.reference(f"days/{uid}").get())


@app.route('/read-days/', methods=['POST'])
def read_days():
    uid = request.json['data']["uid"]
    date = request.json['data']["date"]
    print(request.json)
    # ref = db.reference(f"days/{uid}/{date}")

    return jsonify(db.reference(f"days/{uid}/{date}").get())


if __name__ == '__main__':
    # app.run()

    serve(app, host='0.0.0.0', port=5000, url_scheme='http', threads=8,debug=True)

