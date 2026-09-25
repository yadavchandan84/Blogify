import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { avatarUrl } from '../constants/defaultAvatarUrl';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='sticky top-0 z-50 border-b border-gray-200/70 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-gray-700/60 dark:bg-[rgb(16,23,42)]/70'>
      <Link
        to='/'
        className='flex items-center gap-2 self-center whitespace-nowrap text-lg font-bold sm:text-xl'
      >
        <span className='brand-gradient animated-gradient flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-lg shadow-indigo-500/30'>
          <HiOutlinePencilAlt className='h-5 w-5' />
        </span>
        <span className='brand-text animated-gradient font-extrabold tracking-tight'>
          Blogify
        </span>
      </Link>

      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search articles...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <Button
        className='h-10 w-12 lg:hidden'
        color='gray'
        pill
        onClick={() => navigate('/search')}
      >
        <AiOutlineSearch />
      </Button>

      <div className='flex items-center gap-2 md:order-2'>
        <button
          onClick={() => dispatch(toggleTheme())}
          aria-label='Toggle theme'
          className={`hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-500 sm:flex
    ${
      theme === 'light'
        ? 'bg-gradient-to-br from-amber-300 to-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.8)] hover:scale-110 hover:shadow-[0_0_20px_rgba(251,146,60,1)]'
        : 'bg-gradient-to-br from-indigo-500 to-violet-600 shadow-[0_0_12px_rgba(139,92,246,0.8)] hover:scale-110 hover:shadow-[0_0_20px_rgba(139,92,246,1)]'
    }`}
        >
          {theme === 'light' ? (
            <FaSun className='animate-spin-slow text-lg text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.9)]' />
          ) : (
            <FaMoon className='animate-moon-pulse text-lg text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.9)]' />
          )}
        </button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                className='cursor-pointer ring-2 ring-indigo-500/40 rounded-full'
                alt={currentUser.username}
                img={avatarUrl(currentUser.profilePicture)}
                rounded
              />
            }
          >
            <DropdownHeader>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block truncate text-sm font-medium'>
                {currentUser.email}
              </span>
            </DropdownHeader>
            <Link to={'/dashboard?tab=profile'}>
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <button className='brand-gradient animated-gradient btn-3d cursor-pointer rounded-lg px-5 py-2 text-sm font-semibold text-white'>
              Sign In
            </button>
          </Link>
        )}

        <NavbarToggle className='cursor-pointer' />
      </div>

      <NavbarCollapse>
        <NavbarLink as={Link} to='/' active={path === '/'}>
          Home
        </NavbarLink>
        <NavbarLink as={Link} to='/about' active={path === '/about'}>
          About
        </NavbarLink>
        <NavbarLink as={Link} to='/projects' active={path === '/projects'}>
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
