from flask import Blueprint, request, jsonify
from models import mysql

bp = Blueprint('departmen', __name__)

@bp.route('/departmen', methods=['POST'])
def create_departmen():
    data = request.get_json()
    username = data.get('username')
    nama_departmen = data.get('nama_departmen')

    if not all([username, nama_departmen]):
        return jsonify({'message': 'Missing required parameters'}), 400

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO departmen (username, nama_departmen) VALUES (%s, %s)", (username, nama_departmen))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Departmen created successfully'})

@bp.route('/departmen', methods=['GET'])
def get_all_departmen():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM departmen")
    departmen_records = cur.fetchall()
    cur.close()

    departmen_list = [{'id': record[0], 'username': record[1], 'nama_departmen': record[2]} for record in departmen_records]
    return jsonify(departmen_list)

@bp.route('/departmen/<int:id>', methods=['GET'])
def get_departmen(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM departmen WHERE id = %s", (id,))
    departmen = cur.fetchone()
    cur.close()

    if departmen:
        return jsonify({'id': departmen[0], 'username': departmen[1], 'nama_departmen': departmen[2]})
    else:
        return jsonify({'message': 'Departmen not found'}), 404

@bp.route('/departmen/<int:id>', methods=['PUT'])
def update_departmen(id):
    data = request.get_json()
    nama_departmen = data.get('nama_departmen')

    if not nama_departmen:
        return jsonify({'message': 'Missing nama_departmen parameter'}), 400

    cur = mysql.connection.cursor()
    cur.execute("UPDATE departmen SET nama_departmen = %s WHERE id = %s", (nama_departmen, id))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Departmen updated successfully'})

@bp.route('/departmen/<int:id>', methods=['DELETE'])
def delete_departmen(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM departmen WHERE id = %s", (id,))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Departmen deleted successfully'})
