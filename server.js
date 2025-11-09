import http from 'http';
import fs from 'fs';
import {configureStore} from '@reduxjs/toolkit';

let id = 0;

const reducer = (state=[], action) => {
    switch (action.type) {
        case "ADD_TASK":
            return [
                ...state,
                {
                    id: ++id,
                    task: action.payload.task,
                    completed: false,
                },
            ];
 
        case "REMOVE_TASK":
            return state.filter((task) => task.id !== action.payload.id);
 
        case "TASK_COMPLETED":
            return state.map((task) =>
                task.id === action.payload.id
                    ? {
                          ...task,
                          completed: true,
                      }
                    : task
            );
 
        default:
            return state;
    }
};

const store = configureStore({
        reducer
    });

const unsubscribe = store.subscribe(() => {
    console.log("Updated", store.getState());
});

store.dispatch({ type: "ADD_TASK", payload: { task: "Add new task1"} });
store.dispatch({ type: "ADD_TASK", payload: { task: "Add new task2"} });
store.dispatch({ type: "ADD_TASK", payload: { task: "Add new task3"} });
store.dispatch({ type: "ADD_TASK", payload: { task: "Add new task4"} });
store.dispatch({ type: "ADD_TASK", payload: { task: "Add new task5"} });


//create a server object:
http.createServer(function (req, res) {  
    fs.readFile('index.html', function(err, data) {  
        res.setHeader("x-request-date-time", new Date().getTime())
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080); //the server object listens on port 8080