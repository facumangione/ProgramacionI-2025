# PROGRAMACIÓN 1 - 2025

#### Link a Diseño WEB: [DiseñoWebFigma](https://www.figma.com/design/rFjr5ZyTkEiddQ1mGO6P2M/Programacion1?node-id=0-1&t=Q0F9pt3WOmmFsrf8-1)




























#crear un recuro: main/models/categoria.py
class Categoria(db.Model):
    id_categoria = db.Column(db.Integer, primary_key=True)
    nombre       = db.Column(db.String(50), nullable=False, unique=True)

    def to_json(self):
        return {'id_categoria': self.id_categoria, 'nombre': self.nombre}

    @staticmethod
    def from_json(data):
        return Categoria(nombre=data.get('nombre'))


main/resources/categoria.py
class Categorias(Resource):
    def get(self):
        cats = db.session.query(Categoria).all()
        return jsonify({'categorias': [c.to_json() for c in cats]})

    @active_user
    @role_required(roles=['ADMIN'])
    def post(self):
        cat = Categoria.from_json(request.get_json())
        db.session.add(cat)
        db.session.commit()
        return cat.to_json(), 201


main/__init__.py
api.add_resource(resources.Categorias, '/categorias')


services/categorias.ts
@Injectable({ providedIn: 'root' })
export class CategoriasSvc {
  url = 'http://127.0.0.1:7000';
  constructor(private http: HttpClient) {}

  getCategorias() {
    return this.http.get(`${this.url}/categorias`);
  }
  createCategoria(data: any) {
    return this.http.post(`${this.url}/categorias`, data);
  }
}


'sqlite:////' + DATABASE_PATH + DATABASE_NAME
# resultado: sqlite:////home/facundo/.../backend/rotiseria.db
