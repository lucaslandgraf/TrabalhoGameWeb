// Validação do formulário "Por onde você está acessando o site?"
document.getElementById('btnEnviarAcesso').addEventListener('click', () => {
    const checkboxCelular = document.getElementById('acessoCelular').checked;
    const checkboxComputador = document.getElementById('acessoComputador').checked;

    if (!checkboxCelular && !checkboxComputador) {
        alert('Por favor, selecione pelo menos uma opções');
        return;
    }
    alert('Obrigado por responder!');
});

// Validação do formulário "O jogo está legal?"
document.getElementById('btnEnviarFeedback').addEventListener('click', () => {
    const radioSim = document.getElementById('feedbackSim').checked;
    const radioNao = document.getElementById('feedbackNao').checked;

    if (!radioSim && !radioNao) {
        alert('Por favor, selecione uma das opções.');
        return;
    }
    alert('Obrigado por responder!');
});

document.getElementById('startGame').addEventListener('click', function () {
    // Exibe a área do jogo e oculta o menu
    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('menu').style.display = 'none';

    const maca = document.getElementById('maca');
    const flecha = document.getElementById('flecha');
    const flechasRestantes = document.getElementById('flechas');
    const pontuacao = document.getElementById('pontuacao'); 
    const restartGame = document.getElementById('restartGame'); // Botão de reiniciar

    let totalFlechas = 10; 
    let acertos = 0;
    let macaTop = 0; 
    const maxTop = 400; 
    let isFlechaMovendo = false; 
    let isFlechaErrou = false; 

    // Função para reposicionar a maçã
    function reposicionarMaca() {
        macaTop = 0;
        const randomTop = Math.floor(Math.random() * (maxTop - 100));
        maca.style.left = `${document.getElementById('gameArea').offsetWidth - maca.offsetWidth - 10}px`;
        maca.style.top = `${randomTop}px`;
    }

    // Inicia a queda da maçã
    reposicionarMaca();

    setInterval(() => {
        if (macaTop < maxTop) {
            macaTop += 5; 
            maca.style.top = `${macaTop}px`;
        } else {
            reposicionarMaca();
        }
    }, 50);

    document.addEventListener('mousemove', (e) => {
        if (!isFlechaMovendo) {
            const gameArea = document.getElementById('gameArea');
            const gameAreaRect = gameArea.getBoundingClientRect();
            const mouseY = e.clientY - gameAreaRect.top;

            const flechaMinTop = 100 - 40;
            const flechaMaxTop = 400 + 40;

            if (mouseY >= flechaMinTop && mouseY <= flechaMaxTop) {
                flecha.style.top = `${mouseY}px`;
            }
        }
    });

    document.getElementById('gameArea').addEventListener('click', () => {
        if (isFlechaMovendo || totalFlechas <= 0) return;

        isFlechaMovendo = true;
        isFlechaErrou = false; 
        const flechaInicial = parseInt(flecha.style.left, 10) || 10;
        const flechaTop = parseInt(flecha.style.top, 10);

        let flechaPos = flechaInicial;

        const movimentoFlecha = setInterval(() => {
            flechaPos += 15; 
            flecha.style.left = `${flechaPos}px`;

            if (flechaPos > document.getElementById('gameArea').offsetWidth) {
                if (!isFlechaErrou) {
                    totalFlechas--; 
                    flechasRestantes.textContent = `Flechas restantes: ${totalFlechas}`;
                    alert('Errou!');
                    isFlechaErrou = true; 
                }
                clearInterval(movimentoFlecha);
                reposicionarFlecha();
            }

            const macaLeft = parseInt(window.getComputedStyle(maca).left, 10);
            const macaTopAtual = parseInt(maca.style.top, 10);

            if (
                flechaPos + flecha.offsetWidth >= macaLeft && 
                Math.abs(flechaTop - macaTopAtual) < 40 
            ) {
                acertos++; 
                pontuacao.textContent = `Pontuação: ${acertos}`; 
                alert('Acertou!');
                clearInterval(movimentoFlecha);
                reposicionarFlecha(); 
                return; 
            }
        }, 30);
    });

    function reposicionarFlecha() {
        flecha.style.left = '10px';
        flecha.style.top = '200px';
        isFlechaMovendo = false;

        if (totalFlechas <= 0) {
            alert("Você não tem mais flechas! Fim de jogo!");
            restartGame.style.display = 'block'; // Mostra o botão de reiniciar
        }
    }

    // Reinicia o jogo ao clicar no botão
    restartGame.addEventListener('click', () => {
        restartGame.style.display = 'none'; // Esconde o botão
        totalFlechas = 10;
        acertos = 0;
        flechasRestantes.textContent = `Flechas restantes: ${totalFlechas}`;
        pontuacao.textContent = `Pontuação: ${acertos}`;
        reposicionarMaca();
        reposicionarFlecha();
    });
});
