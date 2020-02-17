import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PhoneIcon from '@material-ui/icons/Phone';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { ApplicationState } from 'store';
import * as OrcamentoStore from 'store/OrcamentoStore';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginBottom: theme.spacing(5),
        }
    }),
);

interface OrcamentoTabs {
    name: string;
    value: number;
    icon: any;
    to: string;
}

export const DadosGerais: OrcamentoTabs = {
    name: "Dados Gerais",
    value: 0,
    icon: PhoneIcon,
    to: '/orcamento/editar/:id/dados'
}

export const Itens: OrcamentoTabs = {
    name: "Itens",
    value: 1,
    icon: FavoriteIcon,
    to: '/orcamento/editar/:id/itens'
}

const OrcamentoTabsList: OrcamentoTabs[] = [DadosGerais, Itens];

type Props = any & {
    tab?: OrcamentoTabs
}

const OrcamentoTabsComponent = (props: Props) => {
    const classes = useStyles();

    const id = props.match.params.id;

    const orcamentoStore = useSelector((s: ApplicationState) => s.orcamento);
    const dispatch = useDispatch();

    const { editarTabPrev } = orcamentoStore;

    const [value, setValue] = useState(editarTabPrev);

    const setTab = (prevTab: number, actTab: number) => {
        dispatch(OrcamentoStore.actionCreators.setTab(prevTab, actTab));
        setValue(actTab);
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(props.tab.value, newValue);
    };

    useEffect(() => {
        if (props.tab && editarTabPrev !== props.tab.value)
            setTab(editarTabPrev, props.tab.value);
    }, []);

    return (
        <Paper square className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="primary"
                aria-label="icon label tabs example"
            >
                {OrcamentoTabsList.map((el, index) => (
                    <Tab icon={<el.icon />} label={el.name} key={index} component={Link} to={el.to.replace(":id", id)} />
                ))}
            </Tabs>
        </Paper>
    );
}

export default withRouter(OrcamentoTabsComponent);