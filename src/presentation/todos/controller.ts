
import { Request, Response } from "express";

const todos = [{
    id: 0,
    message: "Buy more new comment",
    completedAt: new Date()
},{
    id: 1,
    message: "Buy more milk",
    completedAt: new Date()
},{
    id: 2,
    message: "Buy more meat",
    completedAt: new Date()    
},{
    id: 3,
    message: "Buy more vegetales",
    completedAt: null    
},{
    id: 3000,
    message: "Buy more vegetales",
    completedAt: null    
}]

export class TodoController {

    //* Inyeccion de Dependencias
    constructor(){}
    

    public getTodos = (req:Request, res: Response)=>{
        res.json(todos);
    }

    public getTodoById = (req:Request, res: Response)=>{
        const id = +req.params.id; //* convierte a Entero 
        if(isNaN(id)){res.status(400).json({error: 'ID argument is not a number'})}

        //* //////////////////////////////////
        const todo = todos.find(e=>e.id === id);

        (todo)
         ? res.json(todo)
         : res.status(404).json({error:`TODO with the id ${id} not found`})
    }

    public createTodo = (req: Request, res: Response)=>{
        const {message} = req.body;
        if(!message){res.status(400).json({error: 'Message property is required'})}

        const newTodo = {
            id: todos.length + 1,
            message: message,
            completedAt: null
        }
        
        todos.push(newTodo);
        res.json(newTodo);
    }


    public updateTodo(req: Request, res: Response) {
        const id = +req.params.id; // Convierte el ID a número
        if (isNaN(id)) 
            res.status(400).json({ error: "ID argument is not a number" });

        // Buscar el TODO por su ID
        const todo = todos.find((e) => e.id === id);
        if (!todo) 
            res.status(404).json({ error: `TODO with the id ${id} not found` });

        // Validar la propiedad message
        const { message, completedAt } = req.body;
        if (!message) 
            res.status(400).json({ error: "Message property is required" });

        // Actualizar los valores del TODO
        todos[id].message = message || todos[id].message;

        (completedAt === 'null')
            ? todos[id].completedAt = null
            : todos[id].completedAt = new Date(completedAt || todos[id].completedAt);

        //! OJO, se pasa por referencia

        res.json(todos[id]);
    }

    public deleteTodo(req: Request, res:Response){

        const id = +req.params.id

        const todo = todos.find(e=> e.id === id)
        if (!todo) 
            res.status(404).json({ error: `TODO with the id ${id} not found` });
            
        todos.forEach((e, i) => {
                if( e.id === id){
                    res.json(todos[i]);
                    todos.splice(i, 1)
                }
                
        });
       


    }
    
}