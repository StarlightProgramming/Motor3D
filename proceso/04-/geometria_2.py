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

cubo = []
for x in range(-1, 2):
    for y in range(-1, 2):
        for z in range(-1, 2):
            cubo.append(Vector3(x, y, z))
            
#   (-1,-1,1), #izquierda, abajo , cerca    ibc 0 ///
#   (-1,-1,-1),#izquierda, abajo , lejos    ibl 1 ///
#   (-1,1,1),  #izquierda, arriba, cerca    iac 2 ///
#   (-1,1,-1), #izquierda, arriba, lejos    ial 3 ///
#   (1,-1,1),  #derecha  , abajo , cerca    dbc 4 ///
#   (1,-1,-1), #derecha  , abajo , lejos    dbl 5 ///
#   (1,1,1),   #derecha  , arriba, cerca    dac 6 ///
#   (1,1,-1)   #derecha  , arriba, lejos    dal 7 ///
aristas = [
    (0,1),
    (0,2),
    (0,4),
    (1,3),
    (1,5),
    (2,3),
    (2,6),
    (3,7),
    (4,5),
    (4,6),
    (7,5),
    (7,6)
]
#mover el cubo
x = int(input("Cuanto lo movera a la derecha"))
y = int(input("Cuanto lo movera hacia arriba"))
z = int(input("Cuanto lo movera hacia adelante"))
mov = Vector3(x, y, z)
for vertice in range(len(cubo)):
    cubo[vertice].add(mov)
expand = int(input("cuanto quiere expandir el cubo"))
for vertice in range(len(cubo)):
    cubo[vertice].multiply(expand)
for vertice in range(len(cubo)):
    print (cubo[vertice])
for arista in aristas:
    print (arista)