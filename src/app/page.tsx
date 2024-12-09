'use client'
import { 
  roomList, materialList, 
  setDataUsageItem, 
  getDataUsageItemList, 
  updateStatusUsageItem,
  getAllDataUsageItemList,
  deleteMaterial,deleteRoom,
  addMaterial,addRoom
} from '../server/action'
import { useRef, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import {  
  Button,IconButton,
  Table, TableBody, TableCell, TableHead, TableRow, 
  TableContainer,Box, TextField, Paper, ListItemButton, ListItemIcon, 
  ListItemText, List,
  Collapse
 } from '@mui/material';
 
//import icons from react-icons and icons-material
import { BiMenu } from "react-icons/bi"
import { PiClipboardTextDuotone } from "react-icons/pi"
import { RiFunctionAddFill } from "react-icons/ri"
import { MdHistory, MdOutlineLogout, MdOutlineDeleteOutline } from "react-icons/md"
import { SiReaddotcv } from "react-icons/si";
import { FaXmark } from "react-icons/fa6";
import { AiTwotoneSetting } from "react-icons/ai";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { IoMdAddCircle } from "react-icons/io";
import { AiOutlineInsertRowAbove } from "react-icons/ai";

export default function Home () {

  //start:003 this for time running
   const [time,setTime] = useState('')
   const [date,setDate] = useState('')
   useEffect(()=>{
    let animationFrameId: number;
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const period = hours < 12 ? 'AM' : 'PM';
      setTime(`${String(hours % 12 || 12)}:${String(now.getMinutes()).padStart(2, '0')} ${period}`);
      setDate(`${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`)
      animationFrameId = requestAnimationFrame(updateTime);
    };
    updateTime();
    return () => cancelAnimationFrame(animationFrameId);
   },[])
  //end:003

  //start:004 post data from server
  const [tdata,setTData] = useState([{ id:0 ,borrower:'', educator:'', material:[], room:'',status:false }]);
  const [thistory,setTHistory] = useState([{ id:0 ,borrower:'', educator:'', material:[], room:'',date:'',barrowed:'',returned:'' }]);
  const [materialDataList,setMaterialDataList] = useState([])
  const [roomDataList,setRoomDataList] = useState([])

  const [tableStatus, setTableStatus] = useState<boolean[]>([]);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false); 

  const handleTableStatus = async (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    if (isUpdatingStatus) return; 
    setIsUpdatingStatus(true); 
    const id: number = Number(e.currentTarget.getAttribute('table-id'));
    const result = await updateStatusUsageItem(id, !tableStatus[index]);
    if (result) {
      setTableStatus(prevStatus => {
        const updatedStatus = [...prevStatus];
        updatedStatus[index] = !updatedStatus[index];
        return updatedStatus;
      });
    }    
    setIsUpdatingStatus(false); 
  };

  useEffect(()=>{
    (async ()=>{ setTData(await getDataUsageItemList()) })();
    (async ()=>{ setTHistory(await getAllDataUsageItemList()) })();
    (async ()=>{ setMaterialDataList(await materialList()) })();
    (async ()=>{ setRoomDataList(await roomList()) })();
  },[])

  useEffect(() => {
    // Initialize tableStatus with the status values from tdata
    setTableStatus(tdata.map(item => item.status));
  }, [tdata]);

  
  //every change the value of updateUsageItemList it refresh the table
  const [updateUsageItemList,setUpdateUsageItemList] = useState(false)
  useEffect(()=>{
    if(updateUsageItemList){
      (async ()=>{ setTData(await getDataUsageItemList()) })();
      setUpdateUsageItemList(false)
    }
  },[updateUsageItemList])
  //end:004
  
  //start:005 storing first selected list material
  const [selectedMaterial,setSelectedMaterial] = useState<string[]>([])
  const handleAddMaterialSelected = (e:any) =>{
    if(selectedMaterial.includes(e.target.name)) return;
    setSelectedMaterial([...selectedMaterial,e.target.name])
  }
  const handleRemoveMaterialSelected = (e:any)=>{
    setSelectedMaterial(selectedMaterial.filter((selected)=>selected !== e.target.name)) 
  }
  //end:005

  //start:006 store selected class room
  const [selectedRoom,setSelectedRoom] = useState<string>('')
  const handleRoomSelected = (e:any) =>{
    if(selectedRoom === e.target.name) return;
    setSelectedRoom(e.target.name)
  }
  const handleRemoveRoomSelected = (e:any) =>{
    setSelectedRoom('')
  }
  //end:006

  //start:002 this is for show floating button
  const [floating,setFloating] = useState(false)
  const showFloating = useRef<HTMLDivElement | null>(null)
  const disableBg = useRef<HTMLDivElement | null>(null)
  const handleFloatingFrom = () =>{
    if(!showFloating.current || !disableBg){ return }
    const ref1 = showFloating.current
    const ref2 = disableBg.current

    if(floating){
      setSelectedMaterial([]);//empty's selected
      ref1.classList.add('hidden')
      ref2?.classList.remove('pointer-events-none')
      setFloating(false)
    }else{
      ref1.classList.remove('hidden')
      ref2?.classList.add('pointer-events-none')
      setFloating(true)
    }
  }
  //end:002
  
  //start:001 this is for open close of material and room option
  const [material,setMaterial] = useState(true)
  const [room,setRoom] = useState(true)
  const materialOption = useRef<HTMLDivElement | null>(null)
  const roomOption = useRef<HTMLDivElement | null>(null)
  const menuOption = useRef<HTMLDivElement | null>(null)
  const handleMaterialOption = () =>{
    if(!materialOption.current || !menuOption.current || !roomOption.current){ return }
    const ref1 = materialOption.current
    const ref2 = roomOption.current
    const ref3 = menuOption.current
    
    if(material){
      ref1.classList.remove('hidden')
      ref2.classList.add('hidden')
      ref3.classList.add('col-span-1')
      ref3.classList.remove('col-span-2')
      setMaterial(false)
    }else{
      ref1.classList.add('hidden')
      ref2.classList.add('hidden')
      ref3.classList.add('col-span-2')
      ref3.classList.remove('col-span-1')
      setMaterial(true)
    }
  }
  const handleRoomOption = () =>{
    if(!materialOption.current || !menuOption.current || !roomOption.current){ return }
    const ref1 = materialOption.current
    const ref2 = roomOption.current
    const ref3 = menuOption.current
    
    if(room){
      ref2.classList.remove('hidden')
      ref1.classList.add('hidden')
      ref3.classList.add('col-span-1')
      ref3.classList.remove('col-span-2')
      setRoom(false)
    }else{
      ref2.classList.add('hidden')
      ref1.classList.add('hidden')
      ref3.classList.add('col-span-2')
      ref3.classList.remove('col-span-1')
      setRoom(true)
    }
  }
  //end:001

  //start:007 open and close menu list
  const [menu,setMenu] = useState(true)
  const showMenu = useRef<HTMLDivElement | null>(null)
  const expandMain = useRef<HTMLDivElement | null>(null)
  const handleShowMenu = () =>{
    if(!showMenu.current || !expandMain.current){ return }

    const ref1 = showMenu.current
    const ref2 = expandMain.current
     
    if(menu){
      ref1.classList.add('hidden')
      ref2.classList.remove('col-span-4')
      ref2.classList.add('col-span-5')
      setMenu(false)
    }else{
      ref1.classList.remove('hidden')
      ref2.classList.remove('col-span-5')
      ref2.classList.add('col-span-4')
      setMenu(true)
    }
  }
  //end:007 

  //start:008 switching between basic-list, manage and history
  const [showSwitched,setShowSwitched] = useState('basic-list');
  //end:008

  //start:009
  const [openMaterial,isOpenMaterial] = useState<boolean[]>([false])
  const handleTableCellMaterialOpen = (e:any,index:number)=>{
    isOpenMaterial((prevArray: boolean[])=>{
      const arr = [...prevArray]
      if(index >= arr.length){
        const newLength = index + 1 - arr.length
        arr.push(...new Array(newLength).fill(false))
      }
      arr[index] = !arr[index]
      return arr
    })    
  }
  //end:009


  //start:010 get input barrower and educator in text field
  const [inpTextFields,setInpTField] = useState({barrower:'',educator:''})
  const handleChangeText = (e: any)=>{
    setInpTField({
      ...inpTextFields,
      [e.target.name]: e.target.value
    })
  }
  //end:010

  //start:011 This function is responsible for adding a new row of data to the server.
  const addRowDataHiramInServer = async (e:any)=>{
    // Check if all required fields are filled
    if(inpTextFields.barrower === '' || inpTextFields.educator === '' || selectedMaterial.length === 0 || selectedRoom === ''){
      Swal.fire({
        icon: "warning",
        title: "sorry but require to fill all",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    // Send data to the server
    await setDataUsageItem({
      borrower: inpTextFields.barrower,
      educator: inpTextFields.educator,
      material: JSON.stringify(selectedMaterial),
      room: selectedRoom
    }).then((isDone)=>{
      if(isDone){
        // Show success message and update the table
        Swal.fire({
          icon: "success",
          title: "Successfully!",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          setUpdateUsageItemList(!updateUsageItemList)
        })
      }
    })
  }
  //end:011

  const [isButtonMaterialDeleteShow,setButtonMaterialDeleteShow] = useState<boolean[]>([false])
  const visibleButtonMaterialDeleteShow = (index:number) => {
    setButtonMaterialDeleteShow(prevStatus => {
      const updatedStatus = [...prevStatus];
      if (index >= updatedStatus.length) updatedStatus.push(false); 
      updatedStatus[index] = !updatedStatus[index];
      return updatedStatus;
    });
  }
  const handleDeleteMaterial = async (e:any,index:number) => {
    const id: number = Number(e.currentTarget.getAttribute('table-id'));

    setButtonMaterialDeleteShow(prevStatus => {
      const updatedStatus = [...prevStatus];
      if (index >= updatedStatus.length) updatedStatus.push(false); 
      updatedStatus[index] = !updatedStatus[index];
      return updatedStatus;
    });

    await deleteMaterial(id).then((isDone)=>{
      if(isDone){
        // Show success message and update the table
        Swal.fire({
          icon: "success",
          title: "Successfully!",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          (async ()=>{ setMaterialDataList(await materialList()) })();
        })
      }
    })
  }

  const [isButtonRoomDeleteShow,setButtonRoomDeleteShow] = useState<boolean[]>([false])
  const visibleButtonRoomDeleteShow = (index:number) => {
    setButtonRoomDeleteShow(prevStatus => {
      const updatedStatus = [...prevStatus];
      if (index >= updatedStatus.length) updatedStatus.push(false); 
      updatedStatus[index] = !updatedStatus[index];
      return updatedStatus;
    });
  }
  const handleDeleteRoom = async (e:any,index:number)=>{
    const id: number = Number(e.currentTarget.getAttribute('table-id'));
    
    setButtonRoomDeleteShow(prevStatus => {
      const updatedStatus = [...prevStatus];
      if (index >= updatedStatus.length) updatedStatus.push(false); 
      updatedStatus[index] = !updatedStatus[index];
      return updatedStatus;
    });

    await deleteRoom(id).then((isDone)=>{
      if(isDone){
        // Show success message and update the table
        Swal.fire({
          icon: "success",
          title: "Successfully!",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          (async ()=>{ setRoomDataList(await roomList()) })();
        })
      }
    })
  }

  const [isMaterialAddInputShow,setMaterialAddInputShow] = useState(false)
  const handleMaterialAddInputShow = ()=>{
    setMaterialAddInputShow(!isMaterialAddInputShow)
  }

  const [isRoomAddInputShow,setRoomAddInputShow] = useState(false)
  const handleRoomAddInputShow = ()=>{
    setRoomAddInputShow(!isRoomAddInputShow)
  }

  const [roomAddInput,setRoomAddInput] = useState('')
  const handleRoomAddInputChange = (e:any)=>{
    setRoomAddInput(e.target.value)
  }

  const handleRoomAddInputSubmit = async ()=>{
    await addRoom(roomAddInput).then(()=>{
      (async ()=>{ setRoomDataList(await roomList()) })();
    })
  }

  const [materialAddInput,setMaterialAddInput] = useState('')
  const handleMaterialAddInputChange = (e:any)=>{
    setMaterialAddInput(e.target.value)
  }

  const handleMaterialAddInputSubmit = async ()=>{
    await addMaterial(materialAddInput).then(()=>{
      (async ()=>{ setMaterialDataList(await materialList()) })();
    })
  }

  return (
  <>
    <div ref={showFloating} className='hidden '>
      <div className='absolute z-10 inset-0 flex justify-center items-center backdrop-blur-sm'>
        <div className='grid place-content-center grid-cols-2 gap-4'>
          <div ref={menuOption} className='col-span-2 flex justify-end'>
            <Box component='form' className='w-[35ch] shadow-2xl bg-white border-2 rounded-xl py-2 px-4'>
              <div className='grid grid-cols-1 gap-4'>
                <div className='col-span-1'>
                  <div className='grid grid-cols-2'>
                    <div className='col-span-1 flex'>
                      { selectedRoom !== '' && (
                        <Button variant='contained' size='small' sx={{ borderRadius: 50 }} onClick={handleRemoveRoomSelected} className='flex items-center'>{selectedRoom}</Button>
                      )}
                    </div>
                    <div className='col-span-1 flex justify-end'>
                      <IconButton onClick={handleFloatingFrom} ><FaXmark/></IconButton>
                    </div>
                  </div>
                </div>
                <TextField name='barrower' value={inpTextFields.barrower} onChange={handleChangeText} className='col-span-1' size='small' label='Barrower' variant='outlined' fullWidth/>
                <TextField name='educator' value={inpTextFields.educator} onChange={handleChangeText} className='col-span-1' size='small' label='Educator' variant='outlined' fullWidth/>
                <Button onClick={handleMaterialOption} className='col-span-1' variant='outlined' fullWidth>Material</Button>
                <Button onClick={handleRoomOption} className='col-span-1' variant='outlined' fullWidth>Class Room</Button>
                <div className='col-span-1 flex justify-end'>
                  <Button onClick={addRowDataHiramInServer} variant='contained' startIcon={<SiReaddotcv/>}>Add</Button>
                </div>
              </div>
            </Box>
          </div>
          <div ref={materialOption} className='col-span-1 flex items-center hidden'>
            <div className='grid grid-cols-1 gap-2'>
              <div className='col-span-1'>
                <div className='text-md text-black'>Select Available</div>
              </div>
              <div className='col-span-1 w-[35ch] shadow-2xl border-2 rounded-xl py-2 px-4'>
                {selectedMaterial.map((selected,index)=>(
                  <Button key={index} name={selected} onClick={handleRemoveMaterialSelected} component="button" className='m-1' variant='text' sx={{ borderRadius: 50 }}>{selected}</Button>
                ))}
              </div>
              <div className='col-span-1 w-[35ch] shadow-2xl border-2 rounded-xl py-2 px-4'>
                {materialDataList.map((rows:{name:any},index)=>(
                  <Button onClick={handleAddMaterialSelected} component="button" key={index} name={rows.name} className='m-1' variant='text' sx={{ borderRadius: 50 }}>{rows.name}</Button>
                ))}
              </div>
            </div>
          </div>
          <div ref={roomOption} className='col-span-1 flex items-center hidden'>
            <div className='w-[35ch] shadow-2xl border-2 rounded-xl py-2 px-4'>
              {roomDataList.map((rows:{name:any},index)=>(
                <Button key={index} name={rows.name} onClick={handleRoomSelected} component="button" className='m-1' variant='text' sx={{ borderRadius: 50 }}>{rows.name}</Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div ref={disableBg} className="grid grid-cols-5 bg-gray-200 text-black h-full">

      <div ref={showMenu} className="col-span-1 h-screen border border-r rounded-tr-md rounded-br-md py-4 px-2 bg-white shadow-md">
        <div className='grid grid-cols-1 gap-1'>
          <div className='col-span-1 flex justify-center mb-4'>
            <div className="text-xl font-bold">HIRAM</div>
          </div>
          <div className='col-span-1'>
            <Button onClick={()=>{setShowSwitched('basic-list')}} className='flex items-center w-full my-2' style={{ justifyContent: 'flex-start' }} startIcon={<PiClipboardTextDuotone/>}>Basic List</Button>
            <Button onClick={()=>{setShowSwitched('history-list')}} className='flex items-center w-full my-2' style={{ justifyContent: 'flex-start' }} startIcon={<MdHistory/>}>History List</Button>
            <Button onClick={()=>{setShowSwitched('manage')}} className='flex items-center w-full my-2' style={{ justifyContent: 'flex-start' }} startIcon={<AiTwotoneSetting/>}>Manage</Button>
            <Button className='flex items-center w-full my-2' style={{ justifyContent: 'flex-start' }} startIcon={<MdOutlineLogout/>}>Logout</Button>
          </div>
        </div>
      </div>

      <div ref={expandMain} className="col-span-4 h-screen overflow-auto">
        <div className="col-span-6 bg-white p-2 shadow-sm sticky top-0 z-10 bg-opacity-95">
          <div className='grid grid-cols-2'>
            <div className='col-span-1 flex items-center'>
              <div className='grid grid-cols-2 gap-2'>
                <div className='col-span-1'>
                  <IconButton onClick={handleShowMenu}><BiMenu/></IconButton>
                </div>
                <div className='col-span-1'>
                    
                </div>
              </div>
            </div>
            <div className='col-span-1'>
              <div className='flex justify-end'>
                <Button onClick={handleFloatingFrom} className='flex items-center' variant='outlined' startIcon={<RiFunctionAddFill/>}>Add Item</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2 my-2">
          
          {(showSwitched === 'basic-list')  && (
            <>
              <div className="col-span-4 sm:col-span-2  font-dsdigi">
                <div className='px-6 mx-2 bg-white rounded-xl'>
                  <div className='text-[50px]  flex justify-center text-wrap'>{time}</div>
                  <div className='text-[20px] flex justify-center text-wrap'>{date}</div>
                </div>
              </div>
              <div className='col-span-6 px-2'>
                <TableContainer component={Paper} className='' >
                  <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell className='bg-gray-800 text-white'>Borrower</TableCell>
                          <TableCell className='bg-gray-800 text-white'>Educator</TableCell>
                          <TableCell className='bg-gray-800 text-white'>Used In</TableCell>
                          <TableCell className='bg-gray-800 text-white'>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tdata.map((row,index)=>(
                          <TableRow key={index}>
                            <TableCell>{row.borrower}</TableCell>
                            <TableCell>{row.educator}</TableCell>
                            <TableCell>
                              <ListItemButton onClick={(e)=>{handleTableCellMaterialOpen(e,index)}}>
                                <ListItemIcon>
                                  
                                </ListItemIcon>
                                <ListItemText primary={"Class Room : " + row.room} />
                                {openMaterial[index] ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={openMaterial[index]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                  {row.material.map((value:any,index)=>(
                                    <ListItemButton key={index} sx={{ pl: 4 }}>
                                      <ListItemIcon>
                                      
                                      </ListItemIcon>
                                      <ListItemText primary={value} />
                                    </ListItemButton>
                                  ))}
                                </List>
                              </Collapse>
                            </TableCell>
                            <TableCell>
                              <Button table-id={row.id} onClick={(e)=>{handleTableStatus(e,index)}} component="button" variant='outlined' color={tableStatus[index] ? 'success' : 'error'} size='small' sx={{ borderRadius: 50 }} >{tableStatus[index] ? 'Returned' : 'Borrowed'}</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </TableContainer>
              </div>    
            </>
          )}
          {(showSwitched === 'history-list') && (
            <>
              <div className='col-span-6 px-2'>
                <TableContainer component={Paper} className=''>
                  <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell className='bg-gray-800 text-white'>Borrower</TableCell>
                          <TableCell className='bg-gray-800 text-white'>Educator</TableCell>
                          <TableCell className='bg-gray-800 text-white'>Used In</TableCell>
                          <TableCell className='bg-gray-800 text-white'>Date</TableCell>
                          <TableCell className='bg-gray-800 text-white'>Barrowed</TableCell>
                          <TableCell className='bg-gray-800 text-white'>Returned</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {thistory.map((row,index)=>(
                          <TableRow key={index}>
                            <TableCell>{row.borrower}</TableCell>
                            <TableCell>{row.educator}</TableCell>
                            <TableCell>
                              <ListItemButton onClick={(e)=>{handleTableCellMaterialOpen(e,index)}}>
                                <ListItemIcon>
                                  
                                </ListItemIcon>
                                <ListItemText primary={"Class Room : " + row.room} />
                                {openMaterial[index] ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={openMaterial[index]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                  {row.material.map((value:any,index)=>(
                                    <ListItemButton key={index} sx={{ pl: 4 }}>
                                      <ListItemIcon>
                                      
                                      </ListItemIcon>
                                      <ListItemText primary={value} />
                                    </ListItemButton>
                                  ))}
                                </List>
                              </Collapse>
                            </TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.barrowed}</TableCell>
                            <TableCell>{row.returned}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </TableContainer>
              </div>    
            </>
          )}
          {(showSwitched === 'manage') && (
            <>
              <div className='col-span-6'>
                <div className='grid grid-cols-6 gap-2 mx-2 '>
                  <div className='sm:col-span-3 col-span-6'>
                    <div className='bg-white'>
                      <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                              <TableRow>
                                <TableCell className='bg-gray-800 text-white'>
                                  <div className='grid grid-cols-2'>
                                    <div className='col-span-1'>Material List</div>
                                    <div className='col-span-1 flex justify-end'>
                                      <IconButton size='small' onClick={handleMaterialAddInputShow}><IoMdAddCircle className='text-white'/></IconButton> 
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {isMaterialAddInputShow === true && (
                                <TableRow>
                                  <TableCell>
                                    <div className='grid grid-cols-6'>
                                      <div className='col-span-5'>
                                        <TextField value={materialAddInput} onChange={handleMaterialAddInputChange} variant='outlined' size='small' placeholder='Material' label='Add new item' className='w-full'/>
                                      </div>
                                      <div className='col-span-1 flex justify-end'>
                                        <Button className='normal-case' onClick={handleMaterialAddInputSubmit} variant='contained' size='small' startIcon={<AiOutlineInsertRowAbove/>}>Insert</Button>
                                      </div>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )}
                              {materialDataList.map((row:{name:string,id:number},index:number)=>(
                                <TableRow key={index}>
                                  <TableCell>
                                    <div className='grid grid-cols-2'>
                                      <div className='col-span-1'>{row.name}</div>
                                      <div className='col-span-1 flex justify-end'>
                                        {isButtonMaterialDeleteShow[index] === true ? (
                                          <Button className='normal-case' color='error' table-id={row.id} component="button" size='small' variant='outlined' startIcon={<MdOutlineDeleteOutline/>} onClick={(e)=>{handleDeleteMaterial(e,index)}}>Delete</Button>
                                        ) : (
                                          <IconButton size='small' onClick={()=>{visibleButtonMaterialDeleteShow(index)}}><MdOutlineDeleteOutline/></IconButton>
                                        )}
                                      </div>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                      </TableContainer>
                    </div>
                  </div>
                  <div className='sm:col-span-3 col-span-6'>
                    <div className='bg-white'>
                      <TableContainer component={Paper} className=''>
                          <Table stickyHeader>
                              <TableHead>
                                <TableRow>
                                  <TableCell className='bg-gray-800 text-white'>
                                    <div className='grid grid-cols-2'>
                                      <div className='col-span-1'>Room</div>
                                      <div className='col-span-1 flex justify-end'>
                                        <IconButton size='small' onClick={handleRoomAddInputShow}><IoMdAddCircle className='text-white'/></IconButton>
                                      </div>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {isRoomAddInputShow === true && (
                                  <TableRow>
                                    <TableCell>
                                      <div className='grid grid-cols-6'>
                                        <div className='col-span-5'>
                                          <TextField value={roomAddInput} onChange={handleRoomAddInputChange} variant='outlined' size='small' placeholder='Room' label='Add new room' className='w-full'/>
                                        </div>
                                        <div className='col-span-1 flex justify-end'>
                                          <Button className='normal-case' onClick={handleRoomAddInputSubmit} variant='contained' size='small' startIcon={<AiOutlineInsertRowAbove/>}>Insert</Button>
                                        </div>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                )}
                                {roomDataList.map((row:{name:string,id:number},index:number)=>(
                                  <TableRow key={index}>
                                    <TableCell>
                                      <div className='grid grid-cols-2'>
                                        <div className='col-span-1'>{row.name}</div>
                                        <div className='col-span-1 flex justify-end'>
                                          {isButtonRoomDeleteShow[index] === true ? (
                                            <Button className='normal-case' color='error' table-id={row.id} component="button" size='small' variant='outlined' startIcon={<MdOutlineDeleteOutline/>} onClick={(e)=>{handleDeleteRoom(e,index)}}>Delete</Button>
                                          ) : (
                                            <IconButton size='small' onClick={()=>{visibleButtonRoomDeleteShow(index)}}><MdOutlineDeleteOutline/></IconButton>
                                          )}
                                        </div>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  </>
  );
}
