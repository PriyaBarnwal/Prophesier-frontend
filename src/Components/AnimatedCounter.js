import React, {useState, useEffect} from 'react'

const AnimatedCounter = ({likes}) => {
    const [count, setCount] = useState(0);
    let duration = 2;
    useEffect(() => {
        let start = 0;
        const end = parseInt(String(likes).substring(0,3))
        if (start === end) return;
    
        let total = parseInt(duration);
        let incrementTime = (total / end) * 1000;
    
        let timer = setInterval(() => {
          start += 1;
          setCount(String(start) + String(likes).substring(3))
          if (start === end) clearInterval(timer)       
        }, incrementTime);
      }, [likes, duration]);
    return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <p style={{marginBottom: 0, fontSize: '12px'}}>Likes</p>
        <p style={{marginTop: '5px', fontSize: '30px', fontWeight:700, color: '#2F29DC'}}>{count}</p>
    </div>)
}

export default AnimatedCounter