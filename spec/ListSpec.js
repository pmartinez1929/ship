describe("List", function() {

  var allList;

  beforeEach(function(){
    allList = new List();
  });

  it("List empty when is created",function(){
    expect(allList.isEmpty()).toBe(true);
  });

  describe("When a task is added",function(){

    beforeEach(function(){
      allList.addTask("Read and White a Tutorial");
    });

    it("Not empty",function(){
      expect(allList.isEmpty()).toBe(false);
    });

    it("Can have more than one task",function(){
      allList.addTask("Test the program");
      expect(allList.size()).toBe(2);
    });

    /*it("A task have to add in incomplete status", function(){
      expect(allList.Task(0).isDone()).toBe(false);
    });*/

    /*it("A task can be completed",function(){
      expect(allList.Task(0).isDone()).toBe(true);
    });*/

    it("Empty if all the last task was errased",function(){
      expect(allList.isEmpty()).toBe(true);
    });

  });
});
