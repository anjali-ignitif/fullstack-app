import enum
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy_utils import ChoiceType
from flask_cors import CORS

class RoleType(enum.Enum):
    ADMIN = "admin"
    DEVOPS = "devops"
    DEVELOPER = "developer"
    MONITOR = "monitor"

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://myuser:mypassword@localhost:5432/mydb"
db = SQLAlchemy(app)
cors = CORS(app, resources={r"/*": {"origins": "exampledomain.com"}})

class User(db.Model):
    id = db.Column(Integer, primary_key=True)
    username = db.Column(String, unique=True, nullable=False)
    email = db.Column(String)
    privilages = db.relationship("Privilage", back_populates="user")

class Privilage(db.Model):
    id = db.Column(Integer, primary_key=True)
    role = db.Column(ChoiceType(RoleType, impl=String()))
    user_id = db.Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))
    user = db.relationship(User, back_populates="privilages")

def populate_sample_data():
    sample_data = [
        {
            "username": "admin",
            "email": "admin@example.com",
            "privilages": [
                {"role": RoleType.ADMIN},
                {"role": RoleType.DEVOPS},
            ],
        },
        {
            "username": "dev_user",
            "email": "dev@example.com",
            "privilages": [
                {"role": RoleType.DEVELOPER},
            ],
        },
        {
            "username": "monitor_user",
            "email": "monitor@example.com",
            "privilages": [
                {"role": RoleType.MONITOR},
            ],
        },
        {
            "username": "Nihal",
            "email": "nihal@example.com",
            "privilages": [
                {"role": RoleType.DEVELOPER},
            ],
        },
    ]

    for data in sample_data:
        user = User.query.filter_by(username=data["username"]).first()
        if not user:
            user = User(username=data["username"], email=data["email"])
            db.session.add(user)

        for priv_data in data["privilages"]:
            privilage = Privilage.query.filter_by(user=user, role=priv_data["role"]).first()
            if not privilage:
                privilage = Privilage(role=priv_data["role"])
                user.privilages.append(privilage)

    db.session.commit()


@app.route("/users")
def get_users():
    users = User.query.all()
    return [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "previlages": [p.role.name for p in user.privilages],
        }
        for user in users
    ]


@app.route("/privilages")
def get_privilages():
    return [role.name for role in RoleType]



if __name__ == "__main__":
    with app.app_context():
        db.create_all()

        # Check if data already exists and only populate if it doesn't
        if not User.query.first():
            populate_sample_data()

    app.run(host="0.0.0.0", port=5000)
