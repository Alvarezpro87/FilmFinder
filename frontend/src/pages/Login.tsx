import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                email,
                password,
            });

            localStorage.setItem('token', response.data.token); // Salvando o token no localStorage
            navigate('/'); // Redireciona para a página inicial ou qualquer outra página após o login
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            setError('Falha no login. Verifique suas credenciais.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#1e1e1e' }}>
            <div className="card p-4 shadow-sm" style={{ maxWidth: '600px', width: '100%', backgroundColor: '#333', color: '#fff' }}>
                <form onSubmit={handleLogin}>
                    <div className="text-center mb-4">
                        <div className="d-flex justify-content-center align-items-center">
                            <i className="bi bi-camera-reels fs-1"></i>
                        </div>
                        <span style={{ fontSize: '2rem', marginTop: '20px' }}>Entrar</span>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
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
                    <button className="w-100 btn btn-warning btn-lg" style={{ fontSize: '1.5rem' }} type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
