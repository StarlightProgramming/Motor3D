import math


class Vector3:
    def __init__(self, x=0, y=0, z=0):
        self.x = x
        self.y = y
        self.z = z

    # Suma dos vectores
    def sum(self, vector):
        return Vector3(
            self.x + vector.x,
            self.y + vector.y,
            self.z + vector.z
        )

    # Resta dos vectores
    def men(self, vector):
        return Vector3(
            self.x - vector.x,
            self.y - vector.y,
            self.z - vector.z
        )

    # Multiplica por un número
    def mul(self, number):
        return Vector3(
            self.x * number,
            self.y * number,
            self.z * number
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
        return f"({self.x}, {self.y}, {self.z})"
    
v = int(input("Elija la cantidad de vertices de su figura: "))
a = []
for i in range(v):
    x = int(input("Ingrese la posicion en x del vertice: "))
    y = int(input("Ingrese la posicion en y del vertice: "))
    z = int(input("Ingrese la posicion en z del vertice: "))
    b = Vector3(x, y, z)
    a.append(b)
print(a)