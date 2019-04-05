/**
 * Representa una tarea de la lista de tareas.
 * @param title el título de la tarea
 * @constructor
 */

 function Task(title){
   this.title = title;
   this.alreadyDone = false;
 }

 Task.prototype.isDone = function(){
   return this.alreadyDone;
 }

 Task.prototype.done = function(){
   this.alreadyDone = true;
 }

 /**
  * Representa una lista de tareas.
  * Puede tener varias tareas, cada una de las cuales estará terminada o pendiente.
  * @constructor
  */


  function List(){
    this.tasks = [];
  }

  List.prototype.isEmpty = function(){
    return this.tasks.length === 0;
  }

  List.prototype.addTask = function(){
    this.tasks.push(new Task('asd'));
  }

  List.prototype.size = function(){
    return this.tasks.length;
  }

  List.prototype.removeTask = function(taskIndex){
    return this.tasks.splice(taskIndex,1)
  }
