import { Breadcrumbs, Link, LinkProps, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { BreadcrumbItem } from 'utils/breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        marginBottom: {
            marginBottom: theme.spacing(2)
        },
        link: {
            display: 'flex',
        },
        icon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20,
        },
    }),
);

interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => <Link {...props} component={RouterLink as any} />;

type Props = {
    showHome?: boolean;
    itens: BreadcrumbItem[];
    maxItems?: number;
}

const CollapsedBreadcrumbs = (props: Props) => {
    const classes = useStyles();

    return (

        <Breadcrumbs aria-label="breadcrumb"
            maxItems={props.maxItems && props.maxItems > 0 ? props.maxItems : 3}
            className={classes.marginBottom}
            separator={<NavigateNextIcon fontSize="small" />}>
            {props.showHome &&
                <LinkRouter color="inherit" to="/" className={classes.link}>
                    <HomeIcon className={classes.icon} />
                    Início
                </LinkRouter>
            }
            {props.itens.map((value: BreadcrumbItem, index: any) => {
                const last = index === props.itens.length - 1;

                return last ? (
                    <Typography color="primary" key={value.to} className={classes.link}>
                        {value.name}
                    </Typography>
                ) : (
                        <LinkRouter color="inherit" to={value.to} key={value.to} className={classes.link}>
                            {value.name}
                        </LinkRouter>
                    );
            })}
        </Breadcrumbs>
    );
}

export default CollapsedBreadcrumbs;