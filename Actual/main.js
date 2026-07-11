
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
        
        let luz = new Ligth();
        let cam = new Camara(0, 0, -200, 200);
        let escena1 = new Escena();
        let renderer = new Render(canvas);
        let figuras = new Primitivas()
        let cubomesh = figuras.cubo(1);
        let tetraedro = figuras.octaedro(1, 1, 1);
        escena1.cambiar_camara(cam);

        luz.transform.position = cam.transform.position;
        luz.transform.moveby(new Vector3(200, 0, 0));
        escena1.agregar_luz(luz);
        
        let cubo1 = new Figura3D(cubomesh);
        let cubo2 = new Figura3D(cubomesh);
        let tetraedro1 = new Figura3D(tetraedro);

        escena1.agregar(cubo1);
        escena1.agregar(cubo2);
        escena1.agregar(tetraedro1);

        tetraedro1.transform.scaleTo(new Vector3(50, 50, 50));
        tetraedro1.transform.moveto(new Vector3(0, 0, -100));

        cubo1.transform.scaleTo(new Vector3(50, 50, 50));

        cubo2.transform.scaleTo(new Vector3(50, 50, 50));
        cubo2.transform.moveto(new Vector3(0, 0, 200));
        cubo2.material.changeColor(new Color(0, 0, 255));

        renderer.render(escena1);

        let i = 3, l = 3;
        let i1 = -2, l1 = 2;
        let ii = 0;
        function loop()
        {
            tetraedro1.transform.rotateBy(new Vector3(0, 1, 0));
            cubo1.transform.rotateBy(new Vector3(0, -ii, 0));
            cubo2.transform.rotateBy(new Vector3(1, 0, 2));
            cubo2.transform.moveby(new Vector3(i, l, 0));
            //tetraedro1.transform.moveby(new Vector3(i1, l1, 0));
            if(Math.abs(cubo2.transform.position.x) > (canvas.width/2) - 20)
            {
                i *= -1;
            }
            if(Math.abs(cubo2.transform.position.y) > (canvas.height/2) - 20)
            {
                l *= -1;
            }
            if(Math.abs(tetraedro1.transform.position.x) > (canvas.width/2) - 250)
            {
                i1 *= -1;
            }
            if(Math.abs(tetraedro1.transform.position.y) > (canvas.height/2) - 250)
            {
                l1 *= -1;
            }
            renderer.render(escena1);
            requestAnimationFrame(loop);
        }
        loop();

        /*console.log(canvas.height);
        console.log(canvas.width);*/

        document.addEventListener("click", (event) => {
            ii++;
        });
        mouse["x"] = 0;
        mouse["y"] = 0;
        mouse["z"] = 0;
        document.addEventListener("mousemove", (event) => {
            mouse["x"] = event.clientX - canvas.width/2;
            mouse["y"] = -event.clientY + canvas.height/2;

            cubo1.transform.moveto(new Vector3(mouse["x"], mouse["y"], mouse["z"]));
        });
        canvas.addEventListener('wheel', (evento) => {
            evento.preventDefault(); 

            mouse["z"] -= evento.deltaY/100;
            cubo1.transform.moveto(new Vector3(mouse["x"], mouse["y"], mouse["z"]));
            //evento.deltaY < 0) 
        });