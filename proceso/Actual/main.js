
        const canvas = document.getElementById("camara");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let mouse = [];

        import { Vector3 } from "./Math/Vector3D.js";
        import { Ligth } from "./Scene/Light.js";
        import { Camara } from "./Scene/Camera.js";
        import { Escena } from "./Scene/Scene.js";
        import { Render } from "./Graphics/Renderer.js";
        import { Primitivas } from "./Graphics/Primitives.js";
        import { Figura3D } from "./Scene/Figura3D.js";
        import { Color } from "./Math/Color.js";
        import { OBJLoader } from "./OBJ/OBJ.loader.js";
        
        let luz = new Ligth();
        let cam = new Camara(0, 0, -200, 200);
        let escena1 = new Escena();
        let renderer = new Render(canvas);
        let figuras = new Primitivas()
        let objLoader = new OBJLoader();
        let cubomesh = figuras.cubo(1);
        let tetraedro = figuras.octaedro(1, 1, 1);
        escena1.cambiar_camara(cam);



        luz.transform.position = cam.transform.position;
        luz.transform.moveby(new Vector3(200, 0, 0));
        escena1.agregar_luz(luz);

        renderer.render(escena1);
        
        function loop()
        {
            

            renderer.render(escena1);
            requestAnimationFrame(loop);
        }
        loop();

        document.addEventListener("click", (event) => {
            
        });

        document.addEventListener("mousemove", (event) => {
            
        });
        canvas.addEventListener('wheel', (evento) => {
            
        });





        document.getElementById("fileInput").addEventListener("change", async (event) => {
            const archivo = event.target.files[0];
            if (archivo) {
                const objeto = await objLoader.load_User(archivo);
                let figura = new Figura3D(objeto);
                escena1.agregar(figura);
                figura.transform.scaleTo(new Vector3(50, 50, 50));
                figura.transform.moveto(new Vector3(0, 0, -150));
                figura.material.changeColor(new Color(0, 255, 0, 255));
            }
        });