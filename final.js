        const diaDaSemana = document.getElementById('dia-da-semana');        
        const custoInput = document.getElementById('custo-input');
        const quantidadeInput = document.getElementById('quantidade-input');
        const precoInput = document.getElementById('preco-input');
        const botaoAdicionar = document.getElementById('botao-adicionar');
        const output = document.querySelector('.output');


        const lucroDia = document.querySelector('.lucro-do-dia');
        const botaoCalcularDia = document.querySelector('.calcular-lucro-dia');
        
        const botaoCalcularSemana = document.querySelector('.calcular-lucro-semana');
        const lucroSemana = document.querySelector('.lucro-da-semana');

        let valorPopup = document.querySelector('.popup-dias');
        let valorAcumlativo = document.querySelector('.popup-acumulativo');


        
        let diaValor = JSON.parse(localStorage.getItem('logssalvos')) || {
        segunda: [],
        terça: [],
        quarta: [],
        quinta: [],
        sexta: [],
        sábado: []
    };
    botaoAdicionar.addEventListener('click', () => {
        checarEExecutar();
    })
    
    precoInput.addEventListener('keyup', (event) => {
        if(event.key === 'Enter') {
        checarEExecutar();
        }
    })
    
    
    function checarEExecutar() {
        if(quantidadeInput === '' || precoInput.value === '') {
            alert('Todos os campos devem ser preenchidos')
        
        } else {
            adicionarVendaDia(); 
            displayVendasDia();
        }
    }

    function adicionarVendaDia() {
        const dia = diaDaSemana.options[diaDaSemana.selectedIndex].text;
        const custo = Number(custoInput.value);
        const quantidade = Number(quantidadeInput.value);
        const preco = Number(precoInput.value);
        const lucro = (preco - custo * quantidade).toFixed(2);
    
        diaValor[dia].push({
            'custo': custoInput.options[custoInput.selectedIndex].text,
            'quantidade': quantidadeInput.value,
            'preco': precoInput.value,
            'lucro': lucro
        });        
        quantidadeInput.value = '';
        precoInput.value = '';
    }

    function displayVendasDia() {
        const dia = diaDaSemana.options[diaDaSemana.selectedIndex].text;
        let conteudo = '';
        let lucroDoDia = 0;
        diaValor[dia].forEach((valor, index) => {
            let conteudoHtml = `
                <div class="venda">
                    <div class="index">${index + 1} </div>
                    <div class="quantidade-output">${valor.quantidade}</div>
                    <div class="custo-output">${valor.custo}</div>
                    <div class="preco-output">${valor.preco}</div>
                    <div class="lucro-output">${valor.lucro}</div>
                    <button class="botao-duplicar">Duplicar</button>
                    <button class="botao-deletar">Deletar</button>
                </div>
                `
                
                conteudo += conteudoHtml;
            lucroDoDia += Number(valor.lucro); 
        })
        output.innerHTML = conteudo;  
        addEventListener();
        calcularLucroDia();
        atualizarPopup();
        localStorage.setItem('logssalvos' , JSON.stringify(diaValor));
        
       
    };
    diaDaSemana.addEventListener('change', () => {
        displayVendasDia();
        calcularLucroDia();
    });
   

    displayVendasDia();


    //<<< EVENT LISTENERS >>>
    function duplicarValor(index) {
        const dia = diaDaSemana.options[diaDaSemana.selectedIndex].text;
        const duplicarObjeto = Object.assign({}, diaValor[dia][index]);
        diaValor[dia].push(duplicarObjeto);
        displayVendasDia();
    }
    
    function deletarValor(index) {
        const dia = diaDaSemana.options[diaDaSemana.selectedIndex].text;
        diaValor[dia].splice(index, 1);
        displayVendasDia();
    }

    


    function addEventListener() {
        const duplicarButtons = document.getElementsByClassName('botao-duplicar');
        const deletarButtons = document.getElementsByClassName('botao-deletar');

        for (let i = 0; i < duplicarButtons.length; i++) {
            duplicarButtons[i].addEventListener('click', () => {
                duplicarValor(i);
            });
          }      
        for (let i = 0; i < deletarButtons.length; i++) {
            deletarButtons[i].addEventListener('click', () => {
                deletarValor(i)
            })
        }
    }
    //>>> EVENT LISTENERS <<<<

    
    function calcularLucroDia() {
       lucroAcumulativoDia = 0;
       const dia = diaDaSemana.options[diaDaSemana.selectedIndex].text;

       diaValor[dia].forEach((valor) => {
        lucroAcumulativoDia += Number(valor.lucro)
       })
       lucroDia.value = lucroAcumulativoDia.toFixed(2);
      }

    

      function calcularLucroSemana() {
        lucroAcumulativo = 0;
        const dias = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

        dias.forEach((dia) => {
            diaValor[dia].forEach((valor) => {               
                lucroAcumulativo += Number(valor.lucro);
            })
            
        })        
        
        lucroSemana.value = lucroAcumulativo.toFixed(2);
      }
      

    botaoCalcularSemana.addEventListener('click', () => {
        calcularLucroSemana();
    })
    
const popUpContainer = document.querySelector('.popup-container');

document.querySelector('.abrir-popup').addEventListener('click', () => {
    popUpContainer.style.display = 'flex'
})

document.querySelector('.fechar-popup').addEventListener('click', () => {
    popUpContainer.style.display = 'none'
})





function atualizarPopup() {
    let popHtml = '';
    let lucroAcumulativo = 0;

    const dias = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

    dias.forEach((dia) => {
        let lucroDoDia = 0;
        diaValor[dia].forEach((valor) => {         
            lucroDoDia += Number(valor.lucro); 
            lucroAcumulativo += Number(valor.lucro)              
        })
        popHtml += `
            <div>
                <span> ${dia} </span>
                <span> : </span> 
                <span> ${lucroDoDia.toFixed(2)} </span>
            </div>
        `;
    })        
    
    valorPopup.innerHTML = popHtml;       
    valorPopup.innerHTML += `
        <div class="lucro-acumulativo">
            <span> lucro </span>
            <span> : </span>
            <span> ${lucroAcumulativo.toFixed(2)} </span>
        </div>
    `;
}

atualizarPopup();

    