import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    try {
      if (isLogin) {
        // LOGIN
        const res = await fetch(`http://localhost:3000/users?email=${email}`)
        if (!res.ok) {
          throw new Error('Lỗi khi fetch dữ liệu đăng nhập')
        }
  
        const users = await res.json()
        const user = users.find(u => u.password === password)
  
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          setMessage('Đăng nhập thành công ✅')
          setTimeout(() => {
            navigate('/dashboard')
          }, 1000) // chờ 1 giây để hiển thị thông báo rồi mới chuyển trang
        } else {
          setMessage('Sai email hoặc mật khẩu')
        }
      } else {
        // REGISTER
        const check = await fetch(`http://localhost:3000/users?email=${email}`)
        const exists = await check.json()
        if (exists.length > 0) {
          setMessage('Email đã tồn tại.')
          return
        }
  
        const res = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
  
        if (!res.ok) {
          throw new Error('Đăng ký thất bại')
        }
  
        setMessage('Đăng ký thành công! Vui lòng đăng nhập.')
        setIsLogin(true)
      }
    } catch (error) {
      console.error(error)
      setMessage('Lỗi kết nối: kiểm tra lại JSON Server và URL')
    }
  }
  
  

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>{isLogin ? 'Đăng Nhập' : 'Đăng Ký'}</h2>

      {message && <p style={{ color: 'red' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ padding: '8px 15px' }}>
          {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
        </button>
      </form>

      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage('');
        }}
        style={{
          marginTop: '10px',
          background: 'none',
          border: 'none',
          color: 'blue'
        }}
      >
        {isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
      </button>
    </div>
  );
}


