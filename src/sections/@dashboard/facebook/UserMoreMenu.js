import { useRef, useState } from 'react';
import {useSnackbar} from "notistack"

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { adminRoutes } from '../../../api/requests/index';

// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function UserMoreMenu({status,userName,toggle}) {
  const {enqueueSnackbar} = useSnackbar();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const active = status === "Active";
  const changeStatus = async(statusAfterChange) =>{
    try{
      const {data} = await adminRoutes.changeUserStatus({userName,statusAfterChange})
    if(data.success){
      toggle();
      enqueueSnackbar("Status Updated", {
        variant: 'success',
      })
    }
  }catch(e){
    enqueueSnackbar(e.response.data.error, {
      variant: 'error',
    })
  }
  setIsOpen(false)
  }


  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{changeStatus(active ? "Disabled" : "Active")}} >
          <ListItemIcon>
            <Iconify icon={active ? "eva:trash-2-outline" : "eva:edit-fill"} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={active ? "Disable" : "Active"} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
