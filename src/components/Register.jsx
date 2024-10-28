import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import Logo from '../assets/Logo.png';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [isAccepted, setIsAccepted] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAccepted) {
            setMessageType('error');
            setMessage('Você precisa aceitar a Política de Privacidade.');
            return;
        }

        const userData = {
            name,
            email,
            password,
            confirmpassword,
            phone,
            cpf
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, userData);
            setMessage(response.data.msg);

            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userEmail', response.data.user.email);
            localStorage.setItem('userCPF', response.data.user.cpf);

            setMessageType('success');
            setMessage('Operação realizada com sucesso!');
            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.data) {
                setMessageType('error');
                setMessage(error.response.data.msg);
            } else {
                setMessageType('error');
                setMessage('Erro ao conectar com o servidor');
            }
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <div className="header-container">
                <img className='photo' src={Logo} alt="Logo" />
                <h1 className='titulo__inicio'>Crie sua Conta e Comece Agora</h1>
                <p className='paragrafo__inicio'>Cadastre-se e agende sua lavagem com profissionais especializados.</p>
            </div>
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className='seu__nome'>Seu Nome</label>
                        <input
                            type="text"
                            placeholder="João Pedro da Silva"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className='seu__nome'>Seu Email</label>
                        <input
                            type="email"
                            placeholder="seuemail@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className='seu__nome'>Sua Senha</label>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className='seu__nome'>Confirme sua senha</label>
                        <input
                            type="password"
                            placeholder="Confirme sua senha"
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className='seu__nome'>Seu Telefone</label>
                        <input
                            type="tel"
                            placeholder="61982828282"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            maxLength="11" 
                        />
                    </div>
                    <div className="input-group">
                        <label className='seu__nome'>Seu CPF</label>
                        <input
                            type="text"
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            required
                            maxLength="14" 
                        />
                    </div>
                    <div className="policy-container">
                        <input 
                            type="checkbox" 
                            checked={isAccepted} 
                            onChange={() => setIsAccepted(!isAccepted)} 
                            required 
                        />
                        <label>
                            Eu li e aceito a <span onClick={openModal} style={{ color: '#4a90e2', cursor: 'pointer' }}>Política de Privacidade</span>.
                        </label>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                {message && <p className={messageType === 'error' ? 'error-message' : 'success-message'}>{message.trim()}</p>}
                <p className='login'>
                    Já tem uma conta? <Link to="/login">Faça login</Link>
                </p>
            </div>

            {/* Modal */}
            {isModalOpen && (
                 <div className="modal-overlay">
                 <div className="modal-content">
                     <h2>Política de Privacidade e Termos de Uso</h2>
                     <p><strong>Termos de Uso da <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a></strong></p>
         
                     <h2>1. Termos</h2>
                     <p>Ao acessar ao site <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a>, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</p>
         
                     <h2>2. Uso de Licença</h2>
                     <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a>, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:</p>
                     <ul>
                         <li>modificar ou copiar os materiais;</li>
                         <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
                         <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a>;</li>
                         <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
                         <li>transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro servidor.</li>
                     </ul>
                     <p>Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.</p>
         
                     <h2>3. Isenção de responsabilidade</h2>
                     <p>Os materiais no site da <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> são fornecidos 'como estão'. <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>
                     <p>Além disso, o <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</p>
         
                     <h2>4. Limitações</h2>
                     <p>Em nenhum caso o <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a>, mesmo que <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> ou um representante autorizado da <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos consequentes ou incidentais, essas limitações podem não se aplicar a você.</p>
         
                     <h2>5. Precisão dos materiais</h2>
                     <p>Os materiais exibidos no site da <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> podem incluir erros técnicos, tipográficos ou fotográficos. <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> não garante que qualquer material em seu site seja preciso, completo ou atual. <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> não se compromete a atualizar os materiais.</p>
         
                     <h2>6. Links</h2>
                     <p>O <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> do site. O uso de qualquer site vinculado é por conta e risco do usuário.</p>
         
                     <h2>Modificações</h2>
                     <p>O <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</p>
         
                     <h2>Lei aplicável</h2>
                     <p>Estes termos e condições são regidos e interpretados de acordo com as leis do <a href="https://consultarcnpj.com.br/13952873000146" target="_blank">LIATEC CONVENIENCIAS & SERVIÇOS AUTOMOTIVOS LTDA</a> e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</p>
         
                     <p><strong>Data de vigência:</strong> 28/10/2024</p>
                     <button className="close-modal" onClick={closeModal}>X</button>

                 </div>
             </div>
             
            )}
        </div>
    );
};

export default Register;
