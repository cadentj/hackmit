from flask import Flask, request, jsonify

app = Flask(__name__)
from firebase_admin import db, initialize_app
from firebase_admin import credentials
from prompts.final import Janus

DB_URL = "https://janus-4326f-default-rtdb.firebaseio.com"
cred = credentials.Certificate("./janus-4326f-62cc9d861e34.json")
initialize_app(cred, {'databaseURL': DB_URL})


def extract_statements(statement_list):
    return [it["statement"] for it in statement_list]


cat_names = ["goals", "visions", "attributes"]


@app.route('/day-entry/', methods=['GET', 'POST'])
def day_entry():
    """Create a journal entry for a given day."""

    print("day entry")
    uid = request.json["uid"]
    date = request.json["date"]
    # entries = db.reference(f"days/{uid}").get()
    # entry_list = [ent["entry"] for ent in entries.values()]

    metrics_ref = db.reference(f"metrics/{uid}/")
    user_metrics = metrics_ref.get()
    goal_list = extract_statements(user_metrics["goals"])
    vision_list = extract_statements(user_metrics["visions"])
    att_list = extract_statements(user_metrics["attributes"])

    jns = Janus(vision_list, goal_list, att_list)

    evaluation = jns.evaluate(request.json["entry"])

    avgs = []
    for cat_idx, cat_str in enumerate(list(user_metrics.keys())):
        run_avg = 0
        count = 0
        for i in range(len(user_metrics[cat_str])):
            user_metrics[cat_str][i]["score"] = evaluation[str(cat_idx + 1)][i]
            run_avg += user_metrics[cat_str][i]["score"]
            count += 1
            user_metrics[cat_str][i]["status"] = evaluation["4"][cat_str][i]
        avgs.append(int(run_avg / count))

    metrics_ref.set(user_metrics)

    ref = db.reference(f"days/{uid}/{date}")
    ref.set(({"entry": request.json["entry"],
              "goal_rating": avgs[0],
              "vision_rating": avgs[1],
              "att_rating": avgs[2]}))
    return jsonify(user_metrics)


@app.route('/read-metrics/', methods=['GET', 'POST'])
def read_metrics():
    print("reading metrics")
    uid = request.json["uid"]
    return jsonify(db.reference(f"metrics/{uid}").get())


@app.route('/read-days/', methods=['GET', 'POST'])
def read_days():
    uid = request.json["uid"]
    return jsonify(db.reference(f"days/{uid}").get())


if __name__ == '__main__':
    app.run()
