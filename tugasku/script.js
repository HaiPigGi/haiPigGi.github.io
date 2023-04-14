$(document).ready(function() {
    $('.navbar').addClass('animate__animated animate__fadeIn');
  });
  
  const canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const ctx = canvas.getContext('2d');
  
  const mouse = {
    x: null,
    y: null,
    radius: 150
  };
  
  window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2 + 1;
      this.color = '#fff';
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 30 + 1;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
    
    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;
      if (distance < mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 10;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 10;
        }
      }
    }
  }
  
  let particles = [];
  
  function init() {
    for (let i = 0; i < 1000; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      particles.push(new Particle(x, y));
    }
  }
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].draw();
      particles[i].update();
    }
  }
  
  init();
  animate();
  
  
  $(document).ready(function(){
      $('.slider').slick({
        autoplay: true,
        autoplaySpeed: 2500,
      });
    });



//untuk Tugas

const radio = document.getElementById("btnRadio1");
const drop = document.getElementById("drop");

radio.style.display = "none";
drop.style.display = "none";

function showChoices() {
  var numChoices = document.getElementById("numChoices").value;
  var choices = "";
  var pilih = "";
    
  if (numChoices == '') {
    // Tampilkan notifikasi dengan Materialize CSS
    var toastHTML = '<span>Input Belum Terisi</span>';
    M.toast({html: toastHTML});
  } else {
    for (var i = 1; i <= numChoices; i++) {
      choices += "<p>Pilihan <input type='text' id='choice" + i + "' placeholder='Masukkan Pilihan'></p>";
      pilih += "<p><input type='radio' name='selection' value='" + i + "'>Pilihan " + i + "</p>";
    }
    document.getElementById("choices").innerHTML = choices;
    radio.style.display = "block";
  }
}
  
  // Function untuk menyembunyikan notifikasi
  function hideNotification() {
    document.getElementById("choices").innerHTML = "";
  }
  

function radioBtn () {
  var numChoices = document.getElementById("numChoices").value;
  var pilihan =[];
  var pilih="";
  // code lainnya...

  // Disable tombol "Display Data"
  document.getElementById("btnDisplayData").disabled = true;
  document.getElementById("btnReset").disabled = true;

  // Cek apakah semua pilihan sudah dipilih
  var allSelected = true;
  var selections = document.getElementsByName("selection");
  for (var i = 0; i < selections.length; i++) {
    if (!selections[i].checked) {
      allSelected = false;
      break;
    }
  }

  // Jika semua pilihan sudah dipilih, aktifkan tombol "Display Data"
  if (allSelected) {
    document.getElementById("btnDisplayData").disabled = false;
    document.getElementById("btnReset").disabled = false;
  }

  for (var i = 1; i <= numChoices; i++) {
    pilihan[i-1]=document.getElementById("choice"+i).value
    pilih += "<p><input type='radio' name='selection' value='" + pilihan[i-1] + "'>" + pilihan[i-1] + "</p>";
  }
  console.log("hai")
  document.getElementById("selections").innerHTML=pilih;
}

function displayData() {
  var name = document.getElementById("textName").value;
  var choices = document.getElementById("numChoices").value;
  var selections = document.getElementsByName("selection");
  var choiceValues = [];

  for (var i = 0; i < selections.length; i++) {
    if (selections[i].checked) {
      var choice = document.getElementById("choice" + (i+1)).value;
      choiceValues.push(choice);
    }
  }

  var tampilModal = document.getElementById("tampilModal");
  tampilModal.innerHTML = "<p>Nama: " + name + "</p><p>Jumlah Pilihan: " + choices + "</p><p>Pilihan: "  + choiceValues.join(", ") + "</p>";

  // Tampilkan modal
  var myModal = new bootstrap.Modal(document.getElementById('myModal'));
  myModal.show();
  
  // Disable tombol "Display Data" ketika modal ditutup
  myModal.addEventListener('hidden.bs.modal', function () {
    document.getElementById("btnDisplayData").disabled = true;
    document.getElementById("btnReset").disabled = true;
  });
}

function resetData() {
    // Mereset input data dan tombol
    document.getElementById("textName").value = "";
    document.getElementById("numChoices").value = "";
    var selectionInputs = document.getElementsByName("selection");
    for (var i = 0; i < selectionInputs.length; i++) {
      selectionInputs[i].checked = false;
    }
    document.getElementById("btnDisplayData").disabled = true;
    document.getElementById("btnReset").disabled = true;
    document.getElementById("choices").innerHTML = "";
    document.getElementById("selections").innerHTML = "";
    document.getElementById("tampil").innerHTML = "";
    document.getElementById("btnRadio1").disabled = false;
    
    // Mereset tampilan
    var radio = document.getElementById("btnRadio1");
    var drop = document.getElementById("drop");
    radio.style.display = "none";
    drop.style.display = "none";
  }
  


      
