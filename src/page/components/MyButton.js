
import { styled,css } from '@mui/system';
import Button from '@mui/material/Button';


 const MyButton = styled(Button)`
    height: 45px;
    font-weight: 700;
    font-family: 'Poppins';
    font-size: 15px;
    background-color: ${({backgc}) => backgc !== 'bule'?'#fff':'#304FFD'};
    border-radius: 14px;
    color: ${({backgc}) => backgc !== 'bule'?'#304FFD':'#fff'};
    textTransform: 'Capitalize';
    padding: 0 20px;
    ${({backgc}) =>
        css({
          '&:hover': {
            backgroundColor: `${ backgc !== 'bule'?'#fff':'#304FFD'}`,
          },
        })
    }
`

export default MyButton