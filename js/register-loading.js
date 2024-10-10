document.getElementById('btn-login').addEventListener('click', function(event) {
    event.preventDefault();

   
    document.getElementById('loading-screen').style.display = 'flex';
    

    let percentage = 0;
    let loadingInterval = setInterval(function() {
        percentage += 2; 
        document.getElementById('loading-percentage').textContent = percentage + '%';
        
        if (percentage >= 100) {
            clearInterval(loadingInterval); 
            window.location.href = 'home.html';
        }
    }, 100);
});
