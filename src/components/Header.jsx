import React, { useEffect } from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { selectUserEmail,selectUserName, selectUserPhoto, setUserLoginDetails, setSignOutState} from '../features/user/useSlice'


const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userName = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)
    const userEmail = useSelector(selectUserEmail)

    useEffect(() => {
        auth.onAuthStateChanged(async(user) =>  {
            if(user){
                setUser(user)
                navigate('/home')
            }
        })
    }, [userName])

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email:user.email,
                photo: user.photoURL,  
            })
        )
    }

    const signInWithGoogle = () => {
        if(!userName){
        signInWithPopup(auth, provider).then((result) => {setUser(result.user)}).catch((error) => {
          console.log(error)
        })
      } else if(userName){
       signOut(auth, provider).then(() => {dispatch(setSignOutState())
        navigate('/')
        }).catch((error) => alert(error.message))
      }
    }
  return (
    <Nav>
      <Logo>
        <img src='/images/logo.svg' alt='Disney+' />
        </Logo>
        {!userName ?  <Login onClick={signInWithGoogle} >Login</Login> :
        (
            <>
        <NavMenu>
            <a href='/home'>
            <img src='/images/home-icon.svg' alt='HOME'/>
            <span>HOME</span></a>
            <a href='/search'>
            <img src='/images/search-icon.svg' alt='HOME'/>
            <span>SEARCH</span></a>
            <a href='/watchlist'>
            <img src='/images/watchlist-icon.svg' alt='HOME'/>
            <span>WATCHLIST</span></a>
            <a href='/originals'>
            <img src='/images/original-icon.svg' alt='HOME'/>
            <span>ORIGINALS</span></a>
            <a href='/movies'>
            <img src='/images/movie-icon.svg' alt='HOME'/>
            <span>MOVIES</span></a>
            <a href='/series'>
            <img src='/images/series-icon.svg' alt='HOME'/>
            <span>SERIES</span></a>
            </NavMenu>
            <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
                <span onClick={signInWithGoogle}>Sign Out</span>
            </DropDown>
            </SignOut>
            </>
        )
            }
    </Nav>
  )
}

const UserImg = styled.img`
height: 80%;
border-radius:50%;
`;

const Nav = styled.nav`
position: fixed;
top: 0;
left: 0;
right: 0;
height: 70px;
background-color: #090b13;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 36px;
letter-spacing: 16px;
z-index: 3;
`;

const Logo = styled.a`
padding:0;
width:80px;
margin-top:4px;
max-height:70px;
font-size:0;
display:inline-block;
img{
    display:block;
    width:100%;
}
`;

const NavMenu = styled.div`
align-items: center;
display: flex;
flex-flow: row nowrap;
height: 100%;
justify-content: flex-end;
margin: 0px;
padding: 0px;
position: relative;
margin-right: auto;
margin-left: 25px;
a{
    display:flex;
    align-items:center;
    padding: 0 12px;

    img{
        height:20px;
        min-width:20px;
        width:20px;
        z-index:auto;
    }
    span{
        color:rgb(249,249,249);
        font-size:13px;
        letter-spacing:1.42px;
        line-height:1.08;
        padding:2px 0px;
        white-space:nowrap;
        position:relative;

        &:before{
            background-color:rgb(249,249,249);
            border-radius:0px 0px 4px 4px;
            bottom: -6px;
            content: "";
            height: 2px;
            left: 0px;
            opacity: 0;
            position: absolute;
            right: 0px;
            transform-origin: left center;
            transform: scaleX(0);
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            visibility:hidden;
            width: auto;
        }
    }
        &:hover{
            span:before{
                transform: scaleX(1);
                visibility: visible;
                opacity: 1;
            }
}
}
`;

const Login = styled.a`
background-olor: rgb(0,0,0,0.6);
padding: 8px 16px;
text-transform: uppercase;
letter-spacing: 1.5px;
border: 1px solid #f9f9f9;
border-radius: 4px;
transition: all 0.2s ease 0s;

&:hover{
    background-color: #f9f9f9;
    border-color: transparent;
    color: #000;
}
`;

const DropDown = styled.div`
    position:absolute;
    top:48px;
    right:0px;
    background:rgb(19,19,19);
    border:1px solid rgba(151,151,151,0.34);
    border-radius:4px;
    box-shadow:rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding:10px;
    font-size:14px;
    letter-spacing:3px;
    width:100px;
    opacity:0;
`;
const SignOut = styled.div`
position: relative;
height:48px;
width:48px;
display:flex;
cursor:pointer;
align-items:center;
justify-content:center;
    ${UserImg} {
        border-radius:50%;
        width:100%;
        height:100%;
    }

    &:hover {
        ${DropDown}{
            opacity:1;
            transition-duration:1s;
        }
    }
`;

export default Header
