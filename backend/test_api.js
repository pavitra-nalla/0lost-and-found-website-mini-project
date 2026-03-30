import fs from 'fs';

async function testApi() {
    let output = '';

    const log = (msg) => {
        console.log(msg);
        output += msg + '\n';
    };

    try {
        log('### POST /api/auth/register');
        const regRes = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Jane Doe', email: 'jane.test@example.com', password: 'securepassword123' })
        });
        const regData = await regRes.json();
        log(JSON.stringify(regData, null, 2));

        const token = regData.token;

        log('\n### POST /api/items');
        const itemRes = await fetch('http://localhost:5000/api/items', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({
                title: 'Lost Wallet',
                description: 'Black leather wallet found near the park.',
                category: 'Personal',
                location: 'Central Park',
                date: new Date().toISOString(),
                status: 'found'
            })
        });
        const itemData = await itemRes.json();
        log(JSON.stringify(itemData, null, 2));
        
        const itemId = itemData._id;

        if (itemId) {
            log('\n### POST /api/claims');
            const claimRes = await fetch('http://localhost:5000/api/claims', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                    item: itemId,
                    message: 'I would like to claim this as mine!',
                })
            });
            const claimData = await claimRes.json();
            log(JSON.stringify(claimData, null, 2));
        }

        log('\n### GET /api/items?search=wallet');
        const getItemsRes = await fetch('http://localhost:5000/api/items?search=wallet');
        const getItemsData = await getItemsRes.json();
        log(JSON.stringify(getItemsData, null, 2));

    } catch (e) {
        console.error(e);
    }
}
testApi();
