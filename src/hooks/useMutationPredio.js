import { useMutation } from '@apollo/client';
import { DELETE_PREDIO, ADD_PPREDIO } from 'lib/graphql/mutations/predios.mutation';
import { GET_PREDIOS } from 'lib/graphql/queries/predios.query';

export const useDeletePredio = () => {
    const [deletePredio] = useMutation(DELETE_PREDIO,
        {
            refetchQueries: [
                { query: GET_PREDIOS },
                'getPredios'
            ],
        });
    return deletePredio
}
export const useAddPredio = () => {
    const [addPredio] = useMutation(ADD_PPREDIO,
        {
            refetchQueries: [
                { query: GET_PREDIOS },
                'getPredios'
            ],
        });
    return addPredio
}