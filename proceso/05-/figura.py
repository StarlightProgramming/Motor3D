import math


class Vector3:
    def __init__(self, x=0, y=0, z=0):
        self.x = x
        self.y = y
        self.z = z

    # Suma dos vectores
    def add(self, vector):
        return Vector3(
            self.x + vector.x,
            self.y + vector.y,
            self.z + vector.z
        )

    # Resta dos vectores
    def subtract(self, vector):
        return Vector3(
            self.x - vector.x,
            self.y - vector.y,
            self.z - vector.z
        )

    # Multiplica por un número
    def multiply(self, number):
        return Vector3(
            self.x * number,
            self.y * number,
            self.z * number
        )
    
    def rotarX(self, number):
        return Vector3(
            self.x,
            self.y * math.cos(number) - self.z * math.sin(number),
            self.y * math.sin(number) + self.z * math.cos(number)
        )
    def rotarY(self, number):
        return Vector3(
            self.x * math.cos(number) + self.z * math.sin(number),
            self.y,
            -self.x * math.sin(number) + self.z * math.cos(number)
        )
    def rotarZ(self, number):
        return Vector3(
            self.x * math.cos(number) - self.y * math.sin(number),
            self.x * math.sin(number) + self.y * math.cos(number),
            self.z
        )

    # Longitud del vector
    def length(self):
        return math.sqrt(
            self.x ** 2 +
            self.y ** 2 +
            self.z ** 2
        )

    # Devuelve un vector normalizado
    def normalize(self):
        length = self.length()

        if length == 0:
            return Vector3()

        return Vector3(
            self.x / length,
            self.y / length,
            self.z / length
        )

    def __str__(self):
        return f"({round(self.x, 6)}, {round(self.y, 6)}, {round(self.z, 6)})"

class figura3D:
    def __init__(self):
        self.vertices = []
        self.aristas = []

    def agregar_vertice(self, vertice):
        self.vertices.append(vertice)
    
    def agregar_arista(self, arista):
        self.aristas.append(arista)

    def mover(self, vec):
        for vertice in range(len(self.vertices)):
            self.vertices[vertice] = self.vertices[vertice].add(vec)

    def girarX(self, rad):
        for vertice in range(len(self.vertices)):
            self.vertices[vertice] = self.vertices[vertice].rotarX(rad)
    def girarY(self, rad):
        for vertice in range(len(self.vertices)):
            self.vertices[vertice] = self.vertices[vertice].rotarY(rad)
    def girarZ(self, rad):
        for vertice in range(len(self.vertices)):
            self.vertices[vertice] = self.vertices[vertice].rotarZ(rad)

    def mostrar(self):
        for vertice in self.vertices:
            print(vertice)
        for arista in self.aristas:
            print(arista)

cubo = figura3D()
for x in (-1, 1):
    for y in (-1, 1):
        for z in (-1, 1):
                cubo.agregar_vertice(Vector3(x, y, z))
for i in range(len(cubo.vertices)):
    for l in range(i, len(cubo.vertices)):
        dif = 0
        if cubo.vertices[i].x != cubo.vertices[l].x:
            dif = dif + 1
        if cubo.vertices[i].y != cubo.vertices[l].y:
            dif = dif + 1
        if cubo.vertices[i].z != cubo.vertices[l].z:
            dif = dif + 1
        if dif == 1:
            cubo.agregar_arista((i, l))

cubo.mostrar()         
x = int(input("Cuanto movera el cubo a la derecha "))
y = int(input("Cuanto movera el cubo hacia arriba "))
z = int(input("Cuanto movera el cubo hacia adelanta "))
cubo.mover(Vector3(x, y, z))
cubo.mostrar()
print("girado")
cubo.girarX(math.radians(90))
cubo.mostrar()