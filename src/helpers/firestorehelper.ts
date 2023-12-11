import firestore from "@react-native-firebase/firestore"
import { useContext } from "react"
import { loginContext } from "../context/logincontext"
import _ from "lodash"
import cardInterface from "../types/bookmark"
// const { user, initializing } = useContext(loginContext)
export const bookmasrkCollection = firestore().collection('User')





export async function getData(user: any, initializing: any) {
    if (initializing) {
        return
    }
    if (!user) {
        return
    }
    
    const data = await bookmasrkCollection.doc(user.uid).get()
    if (data.exists) {
        return data.data()

    }
    else {
        let _id = new Date().getTime().toString()
        await bookmasrkCollection.doc(user.uid).set({
            [_id]: {
                "url": "https://cookieandkate.com/",
                "title":"Cookie and Kate - Whole Foods and Vegetarian Recipe Blog",
                "favicon":["https://cookieandkate.com/images/2020/11/cropped-favicon-32x32.png"],
                "tags":["food"],
                "isfavourites":true
            }
        })
            .then(() => {
                console.log("added doc")
                return {
                    [_id]: {
                        "url": "https://cookieandkate.com/",
                        "title":"Cookie and Kate - Whole Foods and Vegetarian Recipe Blog",
                        "favicon":["https://cookieandkate.com/images/2020/11/cropped-favicon-32x32.png"],
                        "tags":["food"],
                        "isfavourites":true
                    }
                   
                }

            }).catch(e => {
                console.log("failed")
            })


    }
}


export async function createbookmarkFire(data:any,user:any) {
    try {
        if(!user){
           return  "unable to found usr"
        }
        let bid = data._id
        delete data._id

        await bookmasrkCollection.doc(user.uid).set({
            [bid] : data
        },{merge:true})
        return "success"

    } catch (error) {
        console.log(error)
        return error
    }
}

export async function deleteFirebook(user:any,bookmarkid:any) {
   try {
    if(!user)
    throw new Error("User Not Found")

    await bookmasrkCollection.doc(user.uid).update({
        [bookmarkid]: firestore.FieldValue.delete()
    })

    

   } catch (error) {
    return error
   }
}