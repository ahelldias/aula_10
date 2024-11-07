document.addEventListener('DOMContentLoaded', function() {
    const butNovo = document.getElementById("novo");
    
    butNovo.addEventListener('click', () => {
        window.location.href = "cadastro.html";
    });
    
    const url = 'https://6727d03f270bd0b975539fcb.mockapi.io/animal/animais'
    
    function buscarAnimais () {
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('erro na requisicao');
            } return response.json();
        })
        .then(data => {
            exibirAnimais(data);
        })
        .catch(error => {
            console.error("erro", error);
        })
    }
    
    function exibirAnimais(data) {
        const animais = document.getElementById("animal");
        animais.innerHTML = '';
        
        if (data.length == 0) {
            const mensg = document.createElement('p');
            mensg.textContent = 'Não existe nenhum animal cadastrado!';
            animais.appendChild(mensg);
        } else { 
        data.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>ID:</strong> ${item.id}, <strong>Nome:</strong> ${item.nome}, <strong>Idade:</strong> ${item.idade} anos, <strong>Raça:</strong> ${item.raca}`;
            animais.appendChild(li);
        });
        };
    }
    
    buscarAnimais();
    });

    const form = document.getElementById("formulario");

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const idade = document.getElementById('idade').value;
            const raca = document.getElementById('raca').value;

            const data = {
                nome: nome,
                idade: idade,
                raca: raca
            };

        fetch('https://6727d03f270bd0b975539fcb.mockapi.io/animal/animais', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('erro na requisição');
            } 
            return response.json();        
        })
        .then(data => {
            console.log('sucesso:', data);
            alert('Animal cadastrado com sucesso!');
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error('erro:', error);
            alert('Erro ao cadastrar o animal.');
        });
        });
    }