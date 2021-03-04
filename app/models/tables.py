from app import db

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    senha = db.Column(db.String(50))
    email = db.Column(db.String(60), unique=True)

    def __init__(self, name, email, senha):
        self.name = name
        self.email = email
        self.senha = senha