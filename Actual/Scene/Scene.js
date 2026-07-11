export class Escena{
    constructor(amb = 0.02)
    {
        this.objetos = [];
        this.luces = [];
        this.camara;
        this.ambiente = amb;
    }

    agregar(objeto)
    {
        this.objetos.push(objeto);
    }
    eliminar(objeto)
    {
        let i = this.objetos.indexOf(objeto);

        if(i != -1)
        {
            this.objetos.splice(i, 1);
        }
    }
    
    agregar_luz(objeto)
    {
        this.luces.push(objeto);
    }
    eliminar_luz(objeto)
    {
        let i = this.luces.indexOf(objeto);

        if(i != -1)
        {
            this.luces.splice(i, 1);
        }
    }
    
    cambiar_camara(cam)
    {
        this.camara = cam;
    }
}
