import React from 'react'

const Persons = ({ person }) => {

    return (
        <div>
            {person}
        </div>
    )
    // if (persons) {
    //     let temp
    //     temp = (
    //         persons.map(person => {
    //         //   console.log("person", person)
    //           // return <Persons key={person.id} person={person} />
    //           return <p key={person.id}>{person.name} {person.number} <button key={person.id} >delete</button></p>
              
    //         }))
    //     return (
    //         <div>
    //             {temp}
    //             {/* {person} */}
    //             {/* <p>{person.name} {person.number} <button key={person.id} >delete</button></p> */}
    
    //         </div>
    //     )

    // } else {
    //     return (
    //         <div>
    //             none person
    //         </div>
    //     )
    // }
}

export default Persons