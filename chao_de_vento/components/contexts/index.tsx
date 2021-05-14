import axios from 'axios'
import { createContext, SetStateAction, useEffect, useState } from 'react'
import {
  ChildrenProviderProps,
  UserFileContextData,
  User,
  Album,
  Photo,
  Post,
  Comment,
} from '../../@types/types'
import { api } from '../../pages/api'

export const UserFileContext = createContext({} as UserFileContextData)

export function UserFileProvider({ children }: ChildrenProviderProps) {
  const [users, setUsers] = useState<[User]>()
  const [albuns, setAlbuns] = useState<[Album]>()
  const [photos, setPhotos] = useState<[Photo]>()
  const [posts, setPosts] = useState<[Post]>()
  const [comments, setComments] = useState<[Comment]>()
  const [selectedEnum, setSelectedEnum] = useState('users')

  async function deletePost(id: number) {
    const { status } = await axios.delete(`${api}/posts/${id}`)
    return status
    // console.log(data)
  }

  async function callComments(id: number) {
    const { data } = await axios.get(`${api}/posts/${id}/comments`)
    setComments(data)
    setSelectedEnum('comments')
  }

  async function callPosts(id: number) {
    const { data } = await axios.get(`${api}/users/${id}/posts`)
    setPosts(data)
    console.log(data)
    setSelectedEnum('posts')
  }

  async function callPhotos(id: number) {
    const { data } = await axios.get(`${api}/albums/${id}/photos`)
    setPhotos(data)
    setSelectedEnum('photos')
  }

  async function callAlbuns(id: number) {
    const { data } = await axios.get(`${api}/users/${id}/albums`)
    setAlbuns(data)
    setSelectedEnum('albuns')
  }

  async function callUsers() {
    const { data } = await axios.get(`${api}/users`)
    // console.log(data)
    setUsers(data)
  }

  useEffect(() => {
    callUsers()
  }, [])

  return (
    <UserFileContext.Provider
      value={{
        callUsers,
        callAlbuns,
        callPhotos,
        users,
        albuns,
        photos,
        selectedEnum,
        callPosts,
        posts,
        comments,
        callComments,
        deletePost,
      }}
    >
      {children}
    </UserFileContext.Provider>
  )
}