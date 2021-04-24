import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import Mall from './Mall'
import { Link } from 'react-router-dom'

function Malls({ malls }) {
    return (
        <Grid>
            <Typography variant="h4" color="secondary">Malls</Typography>

            <Grid container spacing={2}>
                {
                    malls.map(mall => (
                        <Grid item sm={4} key={mall.id}>
                            <Mall {...mall} />
                        </Grid>
                    ))
                }


            </Grid>
            <Link to="/malls" className="link">View All</Link>
        </Grid>
    )
}

export default Malls