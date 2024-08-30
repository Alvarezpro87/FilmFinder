import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>(''); 
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('As senhas devem ser iguais.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/users/register', {
                username,
                name, // Incluindo o nome na requisição
                email,
                password,
            });

            localStorage.setItem('token', response.data.token); // Salvando o token no localStorage
            navigate('/login'); // Redireciona para a página de login
        } catch (err) {
            console.error('Erro ao fazer cadastro:', err);
            setError('Falha no cadastro. Verifique suas credenciais.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#1e1e1e' }}>
            <div className="card p-4 shadow-sm" style={{ maxWidth: '600px', width: '100%', backgroundColor: '#333', color: '#fff' }}>
                <form onSubmit={handleRegister}>
                    <div className="text-center mb-4">
                        <div className="d-flex justify-content-center align-items-center">
                            <i className="bi bi-camera-reels fs-1"></i>
                        </div>
                        <span style={{ fontSize: '2rem', marginTop: '20px' }}>Cadastrar</span>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control bg-dark text-white"
                            id="floatingUsername"
                            placeholder="Nome de Usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingUsername" className="text-light">Nome de Usuário</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control bg-dark text-white"
                            id="floatingName"
                            placeholder="Nome Completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Controlando o novo campo
                            required
                        />
                        <label htmlFor="floatingName" className="text-light">Nome Completo</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control bg-dark text-white"
                            id="floatingEmail"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingEmail" className="text-light">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control bg-dark text-white"
                            id="floatingPassword"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingPassword" className="text-light">Senha</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control bg-dark text-white"
                            id="floatingConfirmPassword"
                            placeholder="Confirmar Senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingConfirmPassword" className="text-light">Confirmar Senha</label>
                    </div>
                    <button className="w-100 btn btn-warning btn-lg" style={{ fontSize: '1.5rem' }} type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
