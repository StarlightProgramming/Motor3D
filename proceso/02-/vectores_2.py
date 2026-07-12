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
angulo = math.radians(90)

p = Vector3(1, 0, 0)
p1 = Vector3(0, 1, 0)
p2 = Vector3(0, 0, 1)
print(p.rotarY(angulo))
print(p.rotarZ(angulo))
print(p1.rotarX(angulo))
print(p1.rotarZ(angulo))
print(p2.rotarX(angulo))
print(p2.rotarY(angulo))