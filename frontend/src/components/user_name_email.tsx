import IUser from '../interfaces/user_interface';

const UserNameEmail = ({ user }: { user: IUser | null | undefined }) => {
  return (
    <>
      <span className='margin_bottom_auto font_size_extra_large font_weight_bold display_block'>
        {user?.userName}
      </span>
      <span className='margin_top_auto font_size_large font_weight_bold display_block'>
        {user?.email}
      </span>
    </>
  );
};
export default UserNameEmail;
