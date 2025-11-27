fetch("dashboard.php")
    .then(res => res.json())
    .then(data => {

        if (data.error === "not_logged_in") {
            window.location.href = "login.register.html";
            return;
        }

        const container = document.getElementById("cards");

        if (data.length === 0) {
            container.innerHTML = "<p>Inga kunder inlagda ännu.</p>";
            return;
        }

        let html = "";

        data.forEach(person => {
            html += `
                <div class="card">
                    <h3>${person.person_name}</h3>
                    <p>Synskärpa: <strong>${person.vision}</strong></p>
                    <p>Färgtest: <strong>${person.color_test}</strong></p>
                    <p>Reaktionstid: <strong>${person.reaction_time} ms</strong></p>
                    <p class="small">Datum: ${person.created_at}</p>
                </div>
            `;
        });

        container.innerHTML = html;
    });

    
