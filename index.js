const fs = require("fs")
const { get } = require("http")


/* fs.mkdirSync("./productsFolder"); */




class Contenedor {
    constructor(archivo) {
        this.archivo = archivo
    }

    save(object) {
        
        let objAddId;
        const data = leerArchivo(this.archivo)
        const mapeo = data.map((product) => product.id)
        const mayorId = Math.max(...mapeo);
        const nuevoID = mayorId+1
        nuevoID === -Infinity ? objAddId = 1 : objAddId = nuevoID
        const objAddedId = {...object, id:objAddId}
        data.push(objAddedId) 
        escribirArchivo(this.archivo, JSON.stringify(data))
        console.log("el numero de ID asignado es: "+ objAddId)
    }

    getById(Number) {
        const data = leerArchivo(this.archivo)
        const found = data.find(p => p.id === Number);

        if(found === undefined){
            console.log("no se ha encontrado el item")
        }else {
            const filtro = data.filter(product => product.id ===Number);
            console.log("deletingByID: "+Number)
            console.log(filtro)
        }
        
    }

    getAll() {
        const data = leerArchivo(this.archivo)
        console.log("gettingAll: ")
        console.log(data)
    }

    deleteById(Number) {
        const data = leerArchivo(this.archivo)
        const found = data.find(p => p.id === Number);

        if(found === undefined){
            console.log("no se ha encontrado el item")
        }else {
            const filtro = data.filter(product => product.id !==Number);
            console.log("deletingByID: "+Number)
            console.log(filtro)
            escribirArchivo(this.archivo, JSON.stringify(filtro))
        }
    }

    deleteAll() {
        const nuevoArray = []
        console.log("deletingAll: ")
        console.log(nuevoArray)
        escribirArchivo(this.archivo, JSON.stringify(nuevoArray))
    }
}

const cont1 = new Contenedor ("./productos.json")




leerArchivo =  (archivo) => {
    try {
        const data =  fs.readFileSync(archivo,"utf-8")
        const dataParse =  JSON.parse(data)
        return dataParse
    }
    catch(error) {
        console.log("error")
        console.log(error.message)
    }
}

escribirArchivo =  (archivo, data) => {
    try {
        fs.writeFileSync(archivo, data)
        console.log("archivo editado exitosamente")
    }
    catch(error) {
        console.log("error")
        console.log(error.message)
    }
}

editarArchivo =  (archivo, texto) => {
    try {
        fs.appendFileSync(archivo, texto)
        console.log("archivo editado")
    }
    catch(error) {
        console.log("error")
        console.log(error.message)
    }
}

eliminarArchivo = (archivo) => {
    try {
        fs.unlink(archivo)
        console.log("archivo borrado")
    }
    catch(error) {
        console.log("error")
        console.log(error.message)
    }
}


// llamados

/*
cont1.getAll()
cont1.getById(3)
cont1.deleteById(1)
cont1.deleteAll() 
cont1.save({title: "buzo", price: 7000, thumbnail: "urlBuzos"})
*/












































