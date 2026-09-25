import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='rounded-none border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-[rgb(16,23,42)]'>
      <div className='mx-auto w-full max-w-7xl'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5 max-w-xs'>
            <Link
              to='/'
              className='flex items-center gap-2 self-center whitespace-nowrap text-xl font-bold'
            >
              <span className='brand-gradient flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-lg shadow-indigo-500/30'>
                <HiOutlinePencilAlt className='h-5 w-5' />
              </span>
              <span className='brand-text font-extrabold tracking-tight'>
                Blogify
              </span>
            </Link>
            <p className='mt-3 text-sm text-gray-500 dark:text-gray-400'>
              Stories, tutorials, and resources for curious developers.
            </p>
          </div>
          <div className='mt-4 grid grid-cols-2 gap-8 sm:mt-0 sm:grid-cols-3 sm:gap-6'>
            <div>
              <FooterTitle title='About' />
              <FooterLinkGroup col>
                <FooterLink as={Link} to='/about'>
                  Overview
                </FooterLink>
                <FooterLink as={Link} to='/projects'>
                  Projects
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title='Follow us' />
              <FooterLinkGroup col>
                <FooterLink href='#'>Github</FooterLink>
                <FooterLink href='#'>Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title='Legal' />
              <FooterLinkGroup col>
                <FooterLink href='#'>Privacy Policy</FooterLink>
                <FooterLink href='#'>Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <FooterCopyright
            href='#'
            by='Blogify'
            year={new Date().getFullYear()}
          />
          <div className='mt-4 flex gap-6 sm:mt-0 sm:justify-center'>
            <FooterIcon href='#' icon={BsFacebook} />
            <FooterIcon href='#' icon={BsInstagram} />
            <FooterIcon href='#' icon={BsTwitter} />
            <FooterIcon href='#' icon={BsGithub} />
            <FooterIcon href='#' icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
