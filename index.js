const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

//root server
app.get('/', (req, res) => {
    res.send('start journey with us')
})

//db connected
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tie3l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

async function server() {
    try {
        await client.connect();

        const database = client.db('travels_info')
        const tourplanCollection = database.collection('tourism')

        console.log('database is connected');

        //GET API
        app.get('/tourism', async (req, res) => {
            console.log('dekho body te', req.body);
            // const tourInfo = req.body;
            const result = await tourplanCollection.find({}).toArray()
            res.send(result)
        })
    }
    finally {
        // await client.close();
    }
}
server().catch(console.dir)




app.listen(port, () => {
    console.log(`guys listening port is: ${port}`);
})

/* db info

    username: travelshub
pass: lwE7psB0N1gXzoDE

database: travels_info
collectio: tourism

;
*/











/* const booking = [
    {
        id: 0,
        title: 'Active Winter',
        destination: 'Rome',
        departure: 'Main Square, Old Town',
        cost: 3600,
        dress: 'Casual',
        included: {
            faciliti: '5 Star Accomandation',
            guide: 'Personal Guide',
            air: 'Airport Transfer',
        },
        notinclude: 'Gallery Ticket, Lunch',
        age: '18+',
        package: 'Family',
        gender: 'both are allowed',
        tourplan: {
            first: 'Day 1: Departure',
            second: 'Day 2: Visiting Amsterdam',
            third: 'Day 3: Prague and Vienna',
            four: 'Rest',
            fifth: 'Historical Tour',
            sixth: 'Return'
        },
        image:'https://i.ibb.co/qLSrVvz/10476.jpg',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo.Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.'
    },
    {
        id: 1,
        title: 'Summer Waves',
        destination: 'Norway',
        departure: 'Main Square, Old Town',
        cost: 3000,
        dress: 'Jeans T-shirt',
        included: {
            faciliti: '5 Star Accomandation',
            guide: 'Personal Guide',
            air: 'Airport Transfer',
        },
        notinclude: 'Gallery Ticket, Lunch',
        age: '18+',
        package: 'Combo',
        gender: 'both are allowed',
        tourplan: {
            first: 'Day 1: Departure',
            second: 'Day 2: Visiting Amsterdam',
            third: 'Day 3: Prague and Vienna',
            four: 'Rest',
            fifth: 'Historical Tour',
            sixth: 'Return'
        },
        image:'https://i.ibb.co/c16Sgq1/109.jpg',
        description: ' Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.'
    },
    {
        id: 2,
        title: 'Jumping Joo',
        destination: 'Switzerland',
        departure: 'Main Square, Old Town',
        cost: 5000,
        dress: 'Jeans T-shirt',
        included: {
            faciliti: '5 Star Accomandation',
            guide: 'Personal Guide',
            air: 'Airport Transfer',
        },
        notinclude: 'Gallery Ticket, Lunch',
        age: '18+',
        package: 'Couples',
        gender: 'both are allowed',
        tourplan: {
            first: 'Day 1: Departure',
            second: 'Day 2: Visiting Amsterdam',
            third: 'Day 3: Prague and Vienna',
            four: 'Rest',
            fifth: 'Historical Tour',
            sixth: 'Return'
        },
        image:'https://i.ibb.co/M7hvkwx/108.jpg',
        description: ' Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.'
    },
    {
        id: 3,
        title: 'Sky Driving',
        destination: 'Turkey',
        departure: 'Main Square, Old Town',
        cost: 2000,
        dress: 'Jeans T-shirt',
        included: {
            faciliti: '5 Star Accomandation',
            guide: 'Personal Guide',
            air: 'Airport Transfer',
        },
        notinclude: 'Gallery Ticket, Lunch',
        age: '18+',
        package: 'Bravo',
        gender: 'both are allowed',
        tourplan: {
            first: 'Day 1: Departure',
            second: 'Day 2: Visiting Amsterdam',
            third: 'Day 3: Prague and Vienna',
            four: 'Rest',
            fifth: 'Historical Tour',
            sixth: 'Return'
        },
        image:'https://i.ibb.co/KrhL2h9/106-1.jpg',
        description: ' Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.'
    },
    {
        id: 4,
        title: 'Dubai Tour',
        destination: 'Dubai',
        departure: 'Main Square, Old Town',
        cost: 1500,
        dress: 'Jeans T-shirt',
        included: {
            faciliti: '5 Star Accomandation',
            guide: 'Personal Guide',
            air: 'Airport Transfer',
        },
        notinclude: 'Gallery Ticket, Lunch',
        age: '18+',
        package: 'Combo',
        gender: 'both are allowed',
        tourplan: {
            first: 'Day 1: Departure',
            second: 'Day 2: Visiting Amsterdam',
            third: 'Day 3: Prague and Vienna',
            four: 'Rest',
            fifth: 'Historical Tour',
            sixth: 'Return'
        },
        image:'https://i.ibb.co/hfjsbd6/105.jpg',
        description: ' Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.'
    },
    {
        id: 5,
        title: 'Midnight Camp',
        destination: 'Bolivia',
        departure: 'Main Square, Old Town',
        cost: 5500,
        dress: 'Casual, Jeans T-shirt',
        included: {
            faciliti: '5 Star Accomandation',
            guide: 'Personal Guide',
            air: 'Airport Transfer',
        },
        notinclude: 'Gallery Ticket, Lunch',
        age: '18+',
        package: 'Combo',
        gender: 'both are allowed',
        tourplan: {
            first: 'Day 1: Departure',
            second: 'Day 2: Visiting Amsterdam',
            third: 'Day 3: Prague and Vienna',
            four: 'Rest',
            fifth: 'Historical Tour',
            sixth: 'Return'
        },
        image:'https://i.ibb.co/Mp1TtJ0/106.jpg',
        description: ' Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.'
    },
    {
        id: 6,
        title: "Averest Camp",
        destination: "Nepal",
        departure: "Main Square, Old Town",
        cost: 7500,
        dress: "Casual, Jeans T-shirt",
        included: {
            faciliti: "5 Star Accomandation",
            guide: "Personal Guide",
            air: "Airport Transfer",
        },
        notinclude: "Gallery Ticket, Lunch",
        age: "18+",
        package: "Bravo",
        gender: "both are allowed",
        tourplan: {
            first: "Day 1: Departure",
            second: "Day 2: Visiting Amsterdam",
            third: "Day 3: Prague and Vienna",
            four: "Rest",
            fifth: "Historical Tour",
            sixth: "Return"
        },
        image: "https://i.ibb.co/cXDq5H8/103.jpg",
        description: "Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem."
    },
    {
        id: 7,
        title: "Niagra Falls",
        destination: "South Africa",
        departure: "Main Square, Old Town",
        cost: 5000,
        dress: "Casual, Jeans T-shirt",
        included: {
            faciliti: "5 Star Accomandation",
            guide: "Personal Guide",
            air: "Airport Transfer",
        },
        notinclude: "Gallery Ticket, Lunch",
        age: "18+",
        package: "Bravo",
        gender: "both are allowed",
        tourplan: {
            first: "Day 1: Departure",
            second: "Day 2: Visiting Amsterdam",
            third: "Day 3: Prague and Vienna",
            four: "Rest",
            fifth: "Historical Tour",
            sixth: "Return"
        },
        image: "https://i.ibb.co/JnJ85dB/102.jpg",
        description: "Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem."
    },
    {
        id: 8,
        title: "Amazon Forest",
        destination: "Brazil",
        departure: "Main Square, Old Town",
        cost: 7000,
        dress: "Casual, Jeans T-shirt",
        included: {
            faciliti: "5 Star Accomandation",
            guide: "Personal Guide",
            air: "Airport Transfer",
        },
        notinclude: "Gallery Ticket, Lunch",
        age: "18+",
        package: "Bravo",
        gender: "both are allowed",
        tourplan: {
            first: "Day 1: Departure",
            second: "Day 2: Visiting Amsterdam",
            third: "Day 3: Prague and Vienna",
            four: "Rest",
            fifth: "Historical Tour",
            sixth: "Return"
        },
        image: "https://i.ibb.co/rfYGw8M/101.jpg",
        description: "Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem."
    },   
    {
        id: 9,
        title: "Jurassic Park",
        destination: "Manhattan",
        departure: "Main Square, Old Town",
        cost: 7000,
        dress: "Casual, Jeans T-shirt",
        included: {
            faciliti: "5 Star Accomandation",
            guide: "Personal Guide",
            air: "Airport Transfer",
        },
        notinclude: "Gallery Ticket, Lunch",
        age: "18+",
        package: "Bravo",
        gender: "both are allowed",
        tourplan: {
            first: "Day 1: Departure",
            second: "Day 2: Visiting Amsterdam",
            third: "Day 3: Prague and Vienna",
            four: "Rest",
            fifth: "Historical Tour",
            sixth: "Return"
        },
        image: "https://i.ibb.co/L5Rtdrf/16.jpg",
        description: "Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem."
    },
    {
        id: 10,
        title: "Jurassic Park",
        destination: "Manhattan",
        departure: "Main Square, Old Town",
        cost: 7000,
        dress: "Casual, Jeans T-shirt",
        included: {
            faciliti: "5 Star Accomandation",
            guide: "Personal Guide",
            air: "Airport Transfer",
        },
        notinclude: "Gallery Ticket, Lunch",
        age: "18+",
        package: "Bravo",
        gender: "both are allowed",
        tourplan: {
            first: "Day 1: Departure",
            second: "Day 2: Visiting Amsterdam",
            third: "Day 3: Prague and Vienna",
            four: "Rest",
            fifth: "Historical Tour",
            sixth: "Return"
        },
        image: "https://i.ibb.co/10HdTV2/15.jpg",
        description: "Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem."
    },
];
 */


/* 
https://i.ibb.co/qLSrVvz/10476.jpg

https://i.ibb.co/c16Sgq1/109.jpg

https://i.ibb.co/M7hvkwx/108.jpg

https://i.ibb.co/KrhL2h9/106-1.jpg

https://i.ibb.co/hfjsbd6/105.jpg

https://i.ibb.co/Mp1TtJ0/106.jpg 

https://i.ibb.co/cXDq5H8/103.jpg

https://i.ibb.co/JnJ85dB/102.jpg

https://i.ibb.co/rfYGw8M/101.jpg

https://i.ibb.co/L5Rtdrf/16.jpg

https://i.ibb.co/10HdTV2/15.jpg

https://i.ibb.co/4d4Lv5V/12.jpg
https://i.ibb.co/cwY9gtk/11.jpg
https://i.ibb.co/qn94tsw/10.jpg
https://i.ibb.co/CJgpvZK/09-1.jpg
https://i.ibb.co/bWZ7yrR/07.jpg
https://i.ibb.co/ncM74fm/06.jpg
*/