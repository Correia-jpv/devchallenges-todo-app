import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { Delete } from '@mui/icons-material'

export default function CheckboxList({ list, toggleChecked, deletable = false, ...props }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {list.map((item) => {
        const labelId = `checkbox-list-label-${item.id}`

        return (
          <ListItem
            key={item.id}
            secondaryAction={
              deletable ? (
                <IconButton edge="end" onClick={props.deleteHandler(item.id)} aria-label="delete">
                  <Delete />
                </IconButton>
              ) : null
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={toggleChecked(item.id)} dense>
              <ListItemIcon>
                <Checkbox edge="start" checked={item.checked} tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.name} sx={{ textDecoration: item.checked ? 'line-through' : null, opacity: item.checked ? '0.7' : null }} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
