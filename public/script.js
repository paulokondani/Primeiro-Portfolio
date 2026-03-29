document.addEventListener('DOMContentLoaded', () => {
    // Sample projects data
    const projects = [
        {
            title: 'Plataforma E-commerce',
            description: 'Website moderno de e-commerce construído com React e Node.js, com integração de inventário em tempo real e pagamentos.',
            technologies: 'React, Node.js, MongoDB, Stripe',
            link: '#'
        },
        {
            title: 'App de Gerenciamento de Tarefas',
            description: 'Aplicação colaborativa de gerenciamento de tarefas com atualizações em tempo real e recursos de colaboração em equipe.',
            technologies: 'Vue.js, Express, PostgreSQL, Socket.io',
            link: '#'
        },
        {
            title: 'Chatbot com IA',
            description: 'Chatbot inteligente usando machine learning para fornecer suporte ao cliente e automatizar respostas.',
            technologies: 'Python, TensorFlow, Flask, Dialogflow',
            link: '#'
        },
        {
            title: 'Rastreador de Fitness Mobile',
            description: 'App mobile cross-platform para rastrear treinos, nutrição e métricas de saúde.',
            technologies: 'React Native, Firebase, HealthKit',
            link: '#'
        },
        {
            title: 'Dashboard de Visualização de Dados',
            description: 'Dashboard interativo para análise de negócios com visualização de dados em tempo real e relatórios.',
            technologies: 'D3.js, Node.js, PostgreSQL, Chart.js',
            link: '#'
        },
        {
            title: 'Ferramenta de Gerenciamento de Redes Sociais',
            description: 'Ferramenta completa para gerenciar múltiplas contas de redes sociais com análises e agendamento.',
            technologies: 'React, Python, FastAPI, MongoDB',
            link: '#'
        }
    ];

    const projectList = document.querySelector('.project-list');

    // Add projects to the list with staggered animation
    projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.classList.add('project-item');
        projectItem.style.animationDelay = `${index * 0.1}s`;
        projectItem.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p><strong>Technologies:</strong> ${project.technologies}</p>
            <a href="${project.link}" class="project-link">Ver Projeto</a>
        `;
        projectList.appendChild(projectItem);
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (name && email && subject && message) {
            // Save message to local database
            saveMessageToDatabase({ name, email, phone, subject, message, date: new Date().toISOString() });

            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, phone, subject, message });
            alert('Obrigado pela sua mensagem! Entrarei em contato em breve.');
            contactForm.reset();
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.getElementById('hero');
        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });

    // Typing effect for hero text
    const heroText = document.querySelector('.hero-content h1');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        setTimeout(typeWriter, 1000);
    }

    // Animate stats on scroll
    const animateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (stat.textContent.includes('+') ? '+' : stat.textContent.includes('%') ? '%' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : stat.textContent.includes('%') ? '%' : '');
                }
            }, 20);
        });
    };

    // Trigger stats animation when about section is visible
    const aboutSection = document.getElementById('about');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }

    // Add hover effects for project links
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('project-link')) {
            e.target.parentElement.style.transform = 'translateY(-5px)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('project-link')) {
            e.target.parentElement.style.transform = 'translateY(0)';
        }
    });

    // Database functions for message storage
    function saveMessageToDatabase(messageData) {
        const messages = getMessagesFromDatabase();
        messages.push(messageData);
        localStorage.setItem('portfolio_messages', JSON.stringify(messages));
    }

    function getMessagesFromDatabase() {
        const messages = localStorage.getItem('portfolio_messages');
        return messages ? JSON.parse(messages) : [];
    }

    function clearMessagesFromDatabase() {
        localStorage.removeItem('portfolio_messages');
    }

    // Admin panel toggle (hidden feature - triple click on logo)
    let clickCount = 0;
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 3) {
            showAdminPanel();
            clickCount = 0;
        }
        setTimeout(() => clickCount = 0, 1000);
    });

    function showAdminPanel() {
        // Create admin panel
        const adminPanel = document.createElement('div');
        adminPanel.id = 'admin-panel';
        adminPanel.innerHTML = `
            <div class="admin-overlay">
                <div class="admin-content">
                    <div class="admin-header">
                        <h2>Painel Administrativo - Mensagens</h2>
                        <button class="admin-close">&times;</button>
                    </div>
                    <div class="admin-stats">
                        <div class="stat-item">
                            <span class="stat-number">${getMessagesFromDatabase().length}</span>
                            <span class="stat-label">Mensagens Recebidas</span>
                        </div>
                    </div>
                    <div class="admin-messages">
                        ${getMessagesFromDatabase().length === 0 ?
                            '<p class="no-messages">Nenhuma mensagem recebida ainda.</p>' :
                            getMessagesFromDatabase().map((msg, index) => `
                                <div class="message-item">
                                    <div class="message-header">
                                        <h4>${msg.name} <span class="message-date">${new Date(msg.date).toLocaleDateString('pt-BR')}</span></h4>
                                        <span class="message-email">${msg.email}</span>
                                    </div>
                                    <div class="message-subject">${msg.subject}</div>
                                    <div class="message-content">${msg.message}</div>
                                    ${msg.phone ? `<div class="message-phone">📞 ${msg.phone}</div>` : ''}
                                </div>
                            `).join('')
                        }
                    </div>
                    ${getMessagesFromDatabase().length > 0 ? '<button class="clear-messages-btn">Limpar Todas as Mensagens</button>' : ''}
                </div>
            </div>
        `;
        document.body.appendChild(adminPanel);

        // Add event listeners
        adminPanel.querySelector('.admin-close').addEventListener('click', () => {
            adminPanel.remove();
        });

        adminPanel.querySelector('.admin-overlay').addEventListener('click', (e) => {
            if (e.target === adminPanel.querySelector('.admin-overlay')) {
                adminPanel.remove();
            }
        });

        const clearBtn = adminPanel.querySelector('.clear-messages-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja limpar todas as mensagens?')) {
                    clearMessagesFromDatabase();
                    adminPanel.remove();
                    alert('Todas as mensagens foram removidas.');
                }
            });
        }
    }
});