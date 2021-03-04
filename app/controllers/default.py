from app import app
from flask import Flask, render_template, request, flash, session, redirect, url_for
from app import db
from app.models.tables import Users


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/cadastro', methods=['POST', 'GET'])
def cadastro():
    if request.method == 'POST':
        nome = request.form['nm']
        senha = request.form['pswrd']
        email = request.form['email']
        session['email'] = email
        session['nome'] = nome
        session['senha'] = senha
        guest = Users(name=nome, senha=senha, email=email)
        db.session.add(guest)
        db.session.commit()
        flash(f'Cadastro feito com sucesso!')
    return render_template('cadastro.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        nome = request.form['nm'].lower()
        senha = request.form['pswrd']
        found_user = Users.query.filter_by(name=nome).first()
        if found_user:
            if found_user.senha == senha:
                session['nome'] = nome.capitalize()
                session['email'] = found_user.email
                return redirect(url_for('user'))
            else:
                flash('Senha incorreta!')
        else:
            flash('Você ainda não se cadastrou!')
            return redirect(url_for('cadastro'))
    return render_template('login.html')


@app.route('/user')
def user():
    if 'nome' in session and session['nome'] != 'Administrador':
        return render_template('user.html')
    else:
        return redirect(url_for('login'))


@app.route('/logout')
def logout():
    session.pop('nome', None)
    session.pop('email', None)
    session.pop('senha', None)
    return redirect(url_for('index'))


@app.route('/delete', methods=['POST', 'GET'])
def delete():
    if request.method == 'POST':
        nome = session['nome'].capitalize()
        Users.query.filter_by(name=nome).delete()
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('delete.html')


@app.route('/view')
def view():
    return render_template('view.html', values=Users.query.all())


@app.route('/adm_login', methods=['POST', 'GET'])
def adm_login():
    if request.method == 'POST':
        codigo = request.form['cdg']
        if codigo.lower() == codigo_adm:
            session['nome'] = 'Administrador'
            return redirect(url_for('index'))
    return render_template('adm_login.html')


@app.route('/adm_home')
def adm_home():
    if session['nome'] == 'Administrador':
        return render_template('adm_home.html')