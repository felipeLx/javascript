db.products.updateOne(
    {
        _id: 2
    },
        {$set: {
            reviews: [
            {
                author: "Bob Esponja",
                rating: 6.0,
                review: "meio salgado!"
            },
            {
                author: "Riba",
                rating: 9.0,
                review: "tudo em riba!"   
            }
                    ]
                }
            }
)