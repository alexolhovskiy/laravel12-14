const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

export const fetchApi = async (url, method, data,token) => {
    
    const response = await fetch(url, {
      method,//можно не писать method:method!
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        'Authorization': `Bearer ${token}`,
       },
      credentials: 'include',  // Эта строка гарантирует передачу куков
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const temp=await response.json();
    console.log(temp);
    return temp;
  };