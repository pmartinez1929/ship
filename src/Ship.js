const btn_ship = document.getElementById('btn-ship');
btn_ship.addEventListener('click',function(e){
  e.preventDefault();
  const velocity = document.querySelector('.velocity').value;
  const damageEngine1 = document.querySelector('.damageEngine1').value;
  const damageEngine2 = document.querySelector('.damageEngine2').value;
  const damageEngine3 = document.querySelector('.damageEngine3').value;
  const shipMachine = new Ship(damageEngine1, damageEngine2, damageEngine3);
  printData(shipMachine.velocityRequired(velocity));
});

function Motors(capacity, damage){
  this.capacity = capacity;
  this.damage = damage;
  this.status = true;
}

Motors.prototype.returnCapacity = function(){
  return this.capacity;
}

Motors.prototype.capacityNeeded = function(response){
  if(this.status == true){
    this.capacity -= response;
  }
  return this.capacity;
}

Motors.prototype.checkDamage = function(damage){
  this.capacity -= damage;
  if(this.capacity === 0){
    this.status = false;
  }
  return this.returnCapacity();
}

Motors.prototype.setExtra = function(extra){
  if(this.status == true){
    this.getTime(extra);
    this.capacity += extra;
  }
  if(extra > 99){
    this.capacity = 0;
    this.status = false;
  }
  return this.returnCapacity();
}

Motors.prototype.getTime = function(extra){
  let leftTime = 100;
  leftTime -= extra;
  this.leftTime = leftTime;
  return leftTime;
}


function Ship(damage1, damage2, damage3){
  this.engine1 = new Motors(100, damage1);
  this.engine2 = new Motors(100, damage2);
  this.engine3 = new Motors(100, damage3);
  this.shipMotors = [this.engine1,this.engine2,this.engine3];
}

Ship.prototype.velocityRequired = function(request){
  let velocityRequired = (300*request)/100;
  let checkingMotor = this.checkingEngine();
  let ifMotorNeed;
  let motorsWorks;
  let eachMotor;
  if(velocityRequired > checkingMotor){
    ifMotorNeed = velocityRequired - checkingMotor;
    motorsWorks = this.motorsStatus();
    eachMotor = ifMotorNeed/motorsWorks;
    this.shipMotors.forEach(function(motor){
      motor.setExtra(eachMotor);
    });
  }else if(velocityRequired < checkingMotor){
    ifMotorNeed = checkingMotor - velocityRequired;
    motorsWorks = this.motorsStatus();
    eachMotor = ifMotorNeed / motorsWorks;
    this.shipMotors.forEach(function(motor){
      motor.capacityNeeded(eachMotor);
    });
  }
  return this.shipMotors;
}

Ship.prototype.checkingEngine = function(){
  let engineResponse = 0;
  this.shipMotors.forEach(function(motor){
    motor.checkDamage(motor.damage);
    engineResponse += motor.returnCapacity();
  });
  return engineResponse;
}

Ship.prototype.motorsStatus = function(){
  let motorsWorks = 0;
  this.shipMotors.forEach(function(motor){
    if(motor.status === true){
      motorsWorks++
    }
  });
  return motorsWorks;
}

// UI
function printData(ship_data){
  const row = document.getElementById('result')
  row.innerHTML = '';
  const timeMax = Math.max.apply(Math, ship_data.map(function(e) { return e.leftTime; }));
  ship_data.forEach(function(data){
    row.innerHTML += `<div class="col-4 text-primary aling-center"> ${data.capacity} m/s</div>`;
  });
  if(timeMax){
    row.innerHTML += `<div class="col-12">Tiempo de Motor: ${timeMax}</div>`
  }
}
