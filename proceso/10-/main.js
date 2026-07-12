
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

        /*let mono = new Figura3D(await objLoader.load_Local("./OBJ/suzanne.obj"));
        mono = mono.center()
        console.log("MONO: ", mono.mesh);
        escena1.agregar(mono);
        mono.transform.scaleTo(new Vector3(25, 25, 25));
        mono.transform.moveto(new Vector3(0, 0, -150));
        mono.material.changeColor(new Color(0, 0, 255));*/



        luz.transform.position = cam.transform.position;
        luz.transform.moveby(new Vector3(200, 0, 0));
        escena1.agregar_luz(luz);

        renderer.render(escena1);

        let i = 0;
        function loop()
        {
            console.log("ROTANDO");
            if(escena1.objetos[0] != null)
            {
                escena1.objetos[0].transform.rotateBy(new Vector3(10, 0, 0));
                escena1.objetos[0].transform.moveto(new Vector3(mouse["x"]/10, mouse["y"]/10, mouse["z"]));
                console.log(escena1.objetos[0].mesh.vertices);
            }
            
            renderer.render(escena1);
            requestAnimationFrame(loop);
        }
        loop();

        document.addEventListener("click", (event) => {
            /*if(escena1.objetos[0] != null)
            {
                if(escena1.objetos[0].transform.position.z == -125)
                {
                    escena1.objetos[0].transform.moveto(new Vector3(0, 0, -150));
                }
                else if(escena1.objetos[0].transform.position.z == -150)
                {
                    escena1.objetos[0].transform.moveto(new Vector3(0, 0, -175));
                }
                else
                {
                    escena1.objetos[0].transform.moveto(new Vector3(0, 0, -125));
                }
            }*/
        });
        mouse["x"] = 0;
        mouse["y"] = 0;
        mouse["z"] = 0;
        document.addEventListener("mousemove", (event) => {
            mouse["x"] = event.clientX - canvas.width/2;
            mouse["y"] = -event.clientY + canvas.height/2;

            //cubo1.transform.moveto(new Vector3(mouse["x"], mouse["y"], mouse["z"]));
        });
        canvas.addEventListener('wheel', (evento) => {
            evento.preventDefault(); 

            mouse["z"] -= evento.deltaY/100;
            //cubo1.transform.moveto(new Vector3(mouse["x"], mouse["y"], mouse["z"]));
            //evento.deltaY < 0) 
        });





        document.getElementById("fileInput").addEventListener("change", async (event) => {
            const archivo = event.target.files[0];
            if (archivo) {
                const objeto = await objLoader.load_User(archivo);
                let figura = new Figura3D(objeto);
                escena1.agregar(figura);
                figura.transform.scaleTo(new Vector3(50, 50, 50));
                figura.transform.moveto(new Vector3(0, 0, -150));
                figura.material.changeColor(new Color(0, 255, 0));
            }
        });