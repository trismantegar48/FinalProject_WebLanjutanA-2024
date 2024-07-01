from flask import Blueprint, request, jsonify
from models import mysql

bp = Blueprint('penilaian_kerja', __name__)

@bp.route('/penilaian_kerja', methods=['POST'])
def create_penilaian_kerja():
    data = request.get_json()
    username = data.get('username')
    penilaian = data.get('penilaian')

    if not all([username, penilaian]):
        return jsonify({'message': 'Missing required parameters'}), 400

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO penilaian_kerja (username, penilaian) VALUES (%s, %s)", (username, penilaian))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Penilaian Kerja created successfully'})

@bp.route('/penilaian_kerja', methods=['GET'])
def get_all_penilaian_kerja():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM penilaian_kerja")
    penilaian_kerja_records = cur.fetchall()
    cur.close()

    penilaian_kerja_list = [{'id': record[0], 'username': record[1], 'penilaian': record[2]} for record in penilaian_kerja_records]
    return jsonify(penilaian_kerja_list)

@bp.route('/penilaian_kerja/<int:id>', methods=['GET'])
def get_penilaian_kerja(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM penilaian_kerja WHERE id = %s", (id,))
    penilaian_kerja = cur.fetchone()
    cur.close()

    if penilaian_kerja:
        return jsonify({'id': penilaian_kerja[0], 'username': penilaian_kerja[1], 'penilaian': penilaian_kerja[2]})
    else:
        return jsonify({'message': 'Penilaian Kerja not found'}), 404

@bp.route('/penilaian_kerja/<int:id>', methods=['PUT'])
def update_penilaian_kerja(id):
    data = request.get_json()
    penilaian = data.get('penilaian')

    if not penilaian:
        return jsonify({'message': 'Missing penilaian parameter'}), 400

    cur = mysql.connection.cursor()
    cur.execute("UPDATE penilaian_kerja SET penilaian = %s WHERE id = %s", (penilaian, id))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Penilaian Kerja updated successfully'})

@bp.route('/penilaian_kerja/<int:id>', methods=['DELETE'])
def delete_penilaian_kerja(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM penilaian_kerja WHERE id = %s", (id,))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Penilaian Kerja deleted successfully'})
